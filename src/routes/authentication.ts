import * as express from "express";
import { Controller, Router } from "src/interfaces";
import { AuthenticationController } from "../controllers";
import {
	authenticationMiddleware,
	userLoginValidationMiddleware,
	userValidationMiddleware
} from "../middlewares";

export class AuthenticationRouter implements Router {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const authController = new AuthenticationController();
		this.initializeRoutes(authController);
	}

	public initializeRoutes(controller: Controller): void {
		const path = "/auth";

		this.expressRouter.post(
			`${path}/register`,
			authenticationMiddleware,
			userValidationMiddleware,
			controller.register
		);
		this.expressRouter.post(
			`${path}/login`,
			userLoginValidationMiddleware,
			controller.login
		);
		this.expressRouter.post(`${path}/logout`, controller.logout);
	}
}
