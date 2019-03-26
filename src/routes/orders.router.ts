import * as express from "express";
import { OrdersController } from "../controllers";
import { IController, IRouter } from "../interfaces";
import {
	authenticationMiddleware,
	orderValidationMiddleware
} from "../middlewares";

export class OrdersRouter implements IRouter {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const orderController = new OrdersController();
		this.initializeRoutes(orderController);
	}

	public initializeRoutes(controller: IController) {
		const path: string = "/orders";

		this.expressRouter
			.all(`${path}*`, authenticationMiddleware)
			.get(path, controller.getAll)
			.get(`${path}/:id`, controller.getById)
			.post(path, orderValidationMiddleware, controller.create)
			.put(
				`${path}/:id`,
				orderValidationMiddleware,
				controller.updateById
			)
			.delete(`${path}/:id`, controller.deleteById);
	}
}
