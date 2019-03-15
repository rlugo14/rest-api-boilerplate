import { NextFunction } from "connect";
import * as express from "express";
import UserNotFoundException from "../exceptions/UsertNotFoundException";
import Controller from "../interfaces/controllers.interface";
import UserSchema from "../models/users.models";

class UsersController implements Controller {
    public app: express.Application;
    public path: string;
    public UserSchema;
    private user = new UserSchema().getModelForClass(UserSchema);

    constructor(app: express.Application, path: string) {
        this.app = app;
        this.path = path;
    }

    public getAll = (request: express.Request, response: express.Response, next: NextFunction) => {
        this.user.find({})
            .then((users) => {
                response.send(users);
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

    public create = (request: express.Request, response: express.Response) => {
        const userData = request.body;
        const createdIUser = new this.user(userData);
        createdIUser.save()
            .then((savedPost) => {
                response.send(savedPost);
            });
    }

    public updateById = (request: express.Request, response: express.Response, next: NextFunction) => {
        const id = request.params.id;
        const userData: IUser = request.body;
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
