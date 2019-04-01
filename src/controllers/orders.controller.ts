import * as bcrypt from "bcrypt";
import { NextFunction } from "connect";
import * as express from "express";
import { Document, Model } from "mongoose";
import { UserNotFoundException } from "../exceptions";
import { HttpException } from "../exceptions/HttpException";
import { IController } from "../interfaces";
import { User } from "../models";
import { Order, OrderModel } from "../models";

export class OrdersController implements IController {
	private order = OrderModel;

	public getAll = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	) => {
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
	) => {
		const id = request.params.id;
		this.order
			.findById(id)
			.then(order => {
				if (order) {
					response.send(order);
				} else {
					next(new UserNotFoundException(id));
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
	) => {
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
	) => {
		const id: string = request.params.id;
		console.log(`id: ${id}`)
		const orderData: Order = request.body;
		const order = await this.order.findByIdAndUpdate(
			id,
			orderData,
			{
				new: true
			}, (err: Error, res: Document) => {
				if (res) {
					response.send(res)
				} else if(err) {
					next( new HttpException(422, "Unprocessable entity. The request was well-formed but was unable to be followed due to semantic errors."))
				}
			}
			)
		};

	public deleteById = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	) => {
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
					next(new UserNotFoundException(id));
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
