import { IRouter } from "src/interfaces";
import * as express from "express";
import { AuthenticationController } from "../controllers";

export class AuthenticationRouter implements IRouter {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const authController = new AuthenticationController();
	}

	public initializeRoutes(controller) {
		const path = "/auth";

		this.expressRouter.post(`${path}/register`, controller.register);
		this.expressRouter.post(`${path}/login`, controller.login);
	}
}
