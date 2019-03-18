import { NextFunction } from "connect";
import * as express from "express";
import { validationResult } from "express-validator/check";
import { UserNotFoundException } from "../exceptions";
import { HttpException } from "../exceptions/HttpException";
import { IController } from "../interfaces";
import userModel from "../models/users.model";

class UsersController implements IController {
	public user = userModel;

	public getAll = (request: express.Request, response: express.Response, next: NextFunction) => {
		this.user.find({})
			.then((users) => {
				response.send(users);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	}

	public getById = (request: express.Request, response: express.Response, next: NextFunction) => {
		const id = request.params.id;
		this.user.findById(id)
			.then((user) => {
				if (user) {
					response.send(user);
				} else {
					next(new UserNotFoundException(id));
				}
			});
	}

	public create = (request: express.Request, response: express.Response, next: NextFunction) => {
		const userData = request.body;
		const createdIUser = new this.user(userData);
		createdIUser.save()
			.then((savedPost) => {
				response.send(savedPost);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	}

	public updateById = (request: express.Request, response: express.Response, next: NextFunction) => {
		const id = request.params.id;
		const userData = request.body;
		this.user.findOneAndUpdate(id, userData, { new: true })
			.then((user) => {
				if (user) {
					response.send(user);
				} else {
					next(new UserNotFoundException(id));
				}
			});
	}

	public deleteById = (request: express.Request, response: express.Response, next: NextFunction) => {
		const id = request.params.id;
		this.user.findByIdAndDelete(id)
			.then((successResponse) => {
				if (successResponse) {
					response.json({
						status: 200,
						message: `the user with id: ${id} was deleted successfully`
					});
				} else {
					next(new UserNotFoundException(id));
				}
			});
	}
}

export default UsersController;
