import * as express from "express";
import { UsersController } from "../controllers";
import { Controller, Router } from "../interfaces";
import { authentication } from "../middlewares";
import { userValidation } from "../middlewares";

export class UsersRouter implements Router {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const userController = new UsersController();
		this.initializeRoutes(userController);
	}

	public initializeRoutes(controller: Controller): void {
		const path = "/user";

		this.expressRouter
			.all(`${path}*`, authentication)
			.get(path, controller.getAll)
			.get(`${path}/:id`, controller.getById)
			.post(path, userValidation, controller.create)
			.put(`${path}/:id`, userValidation, controller.updateById)
			.delete(`${path}/:id`, controller.deleteById);
	}
}
