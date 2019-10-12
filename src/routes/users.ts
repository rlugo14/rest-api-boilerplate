import * as express from "express";
import { UsersController } from "../controllers";
import { Controller, Router } from "../interfaces";
import {
	authenticationMiddleware,
	userValidationMiddleware
} from "../middlewares";

export class UsersRouter implements Router {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const userController = new UsersController();
		this.initializeRoutes(userController);
	}

	public initializeRoutes(controller: Controller): void {
		const path = "/user";

		this.expressRouter
			.all(`${path}*`, authenticationMiddleware)
			.get(path, controller.getAll)
			.get(`${path}/:id`, controller.getById)
			.post(path, userValidationMiddleware, controller.create)
			.put(`${path}/:id`, userValidationMiddleware, controller.updateById)
			.delete(`${path}/:id`, controller.deleteById);
	}
}
