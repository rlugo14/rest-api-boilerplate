import { NextFunction } from "connect";
import * as express from "express";
import { ObjectNotFoundException } from "../exceptions";
import { HttpException } from "../exceptions";
import { Controller } from "../interfaces";
import { Order, OrderModel } from "../models";

export class OrdersController implements Controller {
	private order = OrderModel;

	public getAll = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): void => {
		this.order
			.find({})
			.then(orders => {
				response.send(orders);
			})
			.catch((err: Error) => {
				next(new HttpException(500, err.message));
			});
	};

	public getById = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): void => {
		const id = request.params.id;
		this.order
			.findById(id)
			.then(order => {
				if (order) {
					response.send(order);
				} else {
					next(new ObjectNotFoundException(this.order.modelName, id));
				}
			})
			.catch(() =>
				next(
					new HttpException(
						422,
						"Unprocessable entity. The request was well-formed but was unable to be followed due to semantic errors."
					)
				)
			);
	};

	public create = async (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): Promise<void> => {
		const orderData: Order = request.body;

		const createdOrder = new this.order({
			...orderData,
			orderCreationDate: new Date()
		});
		await createdOrder
			.save()
			.then(savedOrder => {
				response.send(savedOrder);
			})
			.catch((err: Error) => {
				next(new HttpException(500, err.message));
			});
	};

	public updateById = async (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): Promise<void> => {
		const id: string = request.params.id;
		const orderData: Order = request.body;
		await this.order
			.findByIdAndUpdate(id, orderData, {
				new: true
			})
			.then(updatedOrder => {
				if (updatedOrder) {
					response.send(updatedOrder);
				} else {
					next(new ObjectNotFoundException(this.order.modelName, id));
				}
			})
			.catch(() => {
				next(
					new HttpException(
						422,
						"Unprocessable entity. The request was well-formed but was unable to be followed due to semantic errors."
					)
				);
			});
	};

	public deleteById = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): void => {
		const id = request.params.id;
		this.order
			.findByIdAndDelete(id)
			.then(successResponse => {
				if (successResponse) {
					response.json({
						status: 200,
						message: `the order with id: ${id} was deleted successfully`
					});
				} else {
					next(new ObjectNotFoundException(this.order.modelName, id));
				}
			})
			.catch(() =>
				next(
					new HttpException(
						422,
						"Unprocessable entity. The request was well-formed but was unable to be followed due to semantic errors."
					)
				)
			);
	};
}
