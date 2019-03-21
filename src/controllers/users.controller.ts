import { NextFunction } from "connect";
import * as express from "express";
import { Model } from "mongoose";
import { UserNotFoundException } from "../exceptions";
import { HttpException } from "../exceptions/HttpException";
import { IController } from "../interfaces";
import { User } from "../models";
import { UserModel } from "../models";

class UsersController implements IController {
	public user: Model<User> = UserModel;

	public getAll = (request: express.Request, response: express.Response, next: NextFunction) => {
		this.user.find({})
			.then((users: Model<User>) => {
				response.send(users);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	}

	public getById = (request: express.Request, response: express.Response, next: NextFunction) => {
		const id = request.params.id;
		this.user.findById(id)
			.then((user: Model<User>) => {
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
			.then((savedPost: Model<User>) => {
				response.send(savedPost);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	}

	public updateById = (request: express.Request, response: express.Response, next: NextFunction) => {
		const id: string = request.params.id;
		const userData: JSON = request.body;
		this.user.findOneAndUpdate(id, userData, {new: true})
			.then((user: Model<User>) => {
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
