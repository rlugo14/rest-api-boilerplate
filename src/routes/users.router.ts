import * as express from "express";
import { UsersController } from "../controllers";
import { IController, IRouter } from "../interfaces";
import { userValidationMiddleware } from "../middlewares/userValidation.middleware";

export class UsersRouter implements IRouter {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const userController = new UsersController();
		this.initializeRoutes(userController);
	}

	public initializeRoutes(controller: IController) {
		const path: string = "/users";

		this.expressRouter
			.get(path, controller.getAll)
			.get(`${path}/:id`, controller.getById)
			.post(path, userValidationMiddleware, controller.create)
			.put(`${path}/:id`, userValidationMiddleware, controller.updateById)
			.delete(`${path}/:id`, controller.deleteById);
	}
}
