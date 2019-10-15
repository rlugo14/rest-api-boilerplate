import * as bcrypt from "bcrypt";
import { NextFunction } from "connect";
import * as express from "express";
import { ObjectNotFoundException } from "../exceptions";
import { HttpException } from "../exceptions";
import { Controller } from "../interfaces";
import { UserModel } from "../models";

export class UsersController implements Controller {
	private user = UserModel;

	public getAll = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): void => {
		this.user
			.find({})
			.then(users => {
				response.send(users);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	};

	// noinspection DuplicatedCode
	public getById = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): void => {
		const id = request.params.id;
		this.user
			.findById(id)
			.then(user => {
				if (user) {
					response.send(user);
				} else {
					next(new ObjectNotFoundException(this.user.modelName, id));
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
		const userData = request.body;
		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const createdIUser = new this.user({
			...userData,
			password: hashedPassword
		});
		await createdIUser
			.save()
			.then(savedPost => {
				userData.password = undefined;
				response.send(savedPost);
			})
			.catch((error: Error) => {
				next(new HttpException(500, error.message));
			});
	};

	public updateById = async (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): Promise<void> => {
		const id: string = request.params.id;
		const userData = request.body;
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		await this.user
			.findOneAndUpdate(id, userData, { new: true })
			.then(user => {
				if (user) {
					const updatedUser = {
						...userData,
						password: hashedPassword
					};
					response.send(updatedUser);
				} else {
					next(new ObjectNotFoundException(this.user.modelName, id));
				}
			});
	};

	public deleteById = (
		request: express.Request,
		response: express.Response,
		next: NextFunction
	): void => {
		const id = request.params.id;
		this.user.findByIdAndDelete(id).then(successResponse => {
			if (successResponse) {
				response.json({
					status: 200,
					message: `the user with id: ${id} was deleted successfully`
				});
			} else {
				next(new ObjectNotFoundException(this.user.modelName, id));
			}
		});
	};
}
