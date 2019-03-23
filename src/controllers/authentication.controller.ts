import * as bcrypt from "bcrypt";
import { NextFunction } from "connect";
import * as express from "express";
import * as mongoose from "mongoose";
import {
	UserWithThatEmailAlreadyExistsException,
	WrongCredentialsException
} from "../exceptions";
import { IController } from "../interfaces";
import { User, UserModel } from "../models";

export class AuthenticationController implements IController {
	private user = UserModel;

	public register = async (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {
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
			res.send(user);
		}
	};

	public login = async (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {
		const loginData: User = req.body;
		const user = await this.user.findOne({ email: loginData.email });
		if (user) {
			const matchedPassword = await bcrypt.compare(loginData.password, user.get("password"));
			if (matchedPassword) {
				user.set("password", undefined);
				res.send(user);
			} else {
				next(new WrongCredentialsException());
			}
		} else {
			next(new WrongCredentialsException());
		}
	};
}
