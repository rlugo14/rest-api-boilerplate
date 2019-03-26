import * as express from "express";
import { IController, IRouter } from "src/interfaces";
import { AuthenticationController } from "../controllers";
import { userLoginValidationMiddleware, userValidationMiddleware } from "../middlewares";

export class AuthenticationRouter implements IRouter {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const authController = new AuthenticationController();
		this.initializeRoutes(authController);
	}

	public initializeRoutes(controller: IController) {
		const path = "/auth";

		this.expressRouter.post(`${path}/register`, userValidationMiddleware ,controller.register);
		this.expressRouter.post(`${path}/login`, userLoginValidationMiddleware, controller.login);
		this.expressRouter.post(`${path}/logout`, controller.logout);

	}
}
