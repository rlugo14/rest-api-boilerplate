import { NextFunction } from "connect";
import * as express from "express";
import { UserNotFoundException } from "../exceptions";
import { HttpException } from "../exceptions/HttpException";
import { UserModel } from "../models";
import { IController } from "../interfaces";

class UsersController implements IController {
	public user = UserModel;

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
		console.log("userData = " + JSON.stringify(userData));
		const createdIUser = new this.user(userData);
		console.log("createdUser = " + JSON.stringify(createdIUser));
		createdIUser.save()
			.then((savedPost) => {
				response.send(savedPost);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	}

	public updateById = (request: express.Request, response: express.Response, next: NextFunction) => {
		const id: string = request.params.id;
		const userData: JSON = request.body;
		console.log("userData = " + JSON.stringify(userData));
		this.user.findOneAndUpdate(id, userData, {new: true})
			.then((user) => {
				if (user) {
					console.log("user = " + user);
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
