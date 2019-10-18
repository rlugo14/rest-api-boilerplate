import { Response, Request } from "express";
import { NextFunction } from "connect";
import * as jwt from "jsonwebtoken";
import { DataStoredInToken } from "src/interfaces";
import {
	AuthenticationTokenMissingException,
	WrongAuthenticationTokenException
} from "../exceptions";
import { UserModel } from "../models";

export async function authenticationMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	const cookies = request.cookies;

	if (cookies && cookies.Authorization) {
		const secret = process.env.JWT_SECRET;
		try {
			const verificationResponse = jwt.verify(
				cookies.Authorization,
				secret
			) as DataStoredInToken;
			const id = verificationResponse._id;
			const user = await UserModel.findById(id);
			if (user) {
				next();
			} else {
				next(new WrongAuthenticationTokenException());
			}
		} catch (error) {
			next(new WrongAuthenticationTokenException());
		}
	} else {
		next(new AuthenticationTokenMissingException());
	}
}
