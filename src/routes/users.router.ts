import * as express from "express";
import { UsersController } from "../controllers";
import { IRouter } from "../interfaces";
import { userChecksMiddleware } from "../middlewares/userValidation.middleware";

export class UsersRouter implements IRouter {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const userController = new UsersController();
		this.initializeRoutes(userController);
	}

	public initializeRoutes(controller) {
		const path: string = "/users";

		this.expressRouter.get(path, controller.getAll);
		this.expressRouter.get(`${path}/:id`, controller.getById);

		this.expressRouter.post(path, userChecksMiddleware, controller.create);

		this.expressRouter.put(
			`${path}/:id`,
			userChecksMiddleware,
			controller.updateById
		);

		this.expressRouter.delete(`${path}/:id`, controller.deleteById);
	}
}
