import { IController } from "../interfaces";
import { NextFunction } from "connect";
import * as express from "express";

export class AuthenticationController implements IController {
	public register = (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {};
	public login = (
		req: express.Request,
		res: express.Response,
		next: NextFunction
	) => {};
}
