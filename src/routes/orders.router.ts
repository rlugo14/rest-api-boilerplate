import * as express from "express";
import { OrdersController } from "../controllers";
import { IController, IRouter } from "../interfaces";
import { orderValidationMiddleware } from "../middlewares";

export class OrdersRouter implements IRouter {
	public expressRouter: express.Router = express.Router();

	constructor() {
		const orderController = new OrdersController();
		this.initializeRoutes(orderController);
	}

	public initializeRoutes(controller: IController) {
		const path: string = "/orders";

		this.expressRouter.get(path, controller.getAll);
		this.expressRouter.get(`${path}/:id`, controller.getById);

		this.expressRouter.post(path, orderValidationMiddleware, controller.create);

		this.expressRouter.put(
			`${path}/:id`,
			orderValidationMiddleware,
			controller.updateById,
		);

		this.expressRouter.delete(`${path}/:id`, controller.deleteById);
	}
}
