import * as bcrypt from "bcrypt";
import { NextFunction } from "connect";
import * as express from "express";
import * as jwt from "jsonwebtoken";
import { Document } from "mongoose";
import {
	UserWithThatEmailAlreadyExistsException,
	WrongCredentialsException
} from "../exceptions";
import { Controller, DataStoredInToken, TokenData } from "../interfaces";
import { User, UserModel } from "../models";

export class AuthenticationController implements Controller {
	private user = UserModel;

	private static createToken(user: Document): TokenData {
		const expiresIn = 60 * 60; // an hour
		const secret = process.env.JWT_SECRET;
		const dataStoredInToken: DataStoredInToken = {
			_id: user.get("_id")
		};
		return {
			expiresIn,
			token: jwt.sign(dataStoredInToken, secret, { expiresIn })
		};
	}

	private static createCookie(tokenData: TokenData): string {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
	}

	public register = async (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> => {
		const userData: User = req.body;
		if (await this.user.findOne({ email: userData.email })) {
			next(new UserWithThatEmailAlreadyExistsException(userData.email));
		} else {
			const hashedPassword = await bcrypt.hash(userData.password, 10);
			const user = await this.user.create({
				...userData,
				password: hashedPassword
			});
			user.set("password", undefined);
			const tokenData = AuthenticationController.createToken(user);
			res.setHeader("Set-Cookie", [
				AuthenticationController.createCookie(tokenData)
			]);
			res.send(user);
		}
	};

	public login = async (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	): Promise<void> => {
		const loginData: User = req.body;
		const user = await this.user.findOne({ email: loginData.email });
		if (user) {
			const matchedPassword = await bcrypt.compare(
				loginData.password,
				user.get("password")
			);

			if (matchedPassword) {
				user.set("password", undefined);
				const tokenData = AuthenticationController.createToken(user);
				res.setHeader("Set-Cookie", [
					AuthenticationController.createCookie(tokenData)
				]);
				res.send(user);
			} else {
				next(new WrongCredentialsException());
			}
		} else {
			next(new WrongCredentialsException());
		}
	};

	public logout = (
		request: express.Request,
		response: express.Response
	): void => {
		response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
		response
			.status(200)
			.send({ status: 200, message: "logout successfully" });
	};
}
