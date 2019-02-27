import { NextFunction } from "connect";
import * as express from "express";
import HttpException from "../exceptions/HttpException";
import PostNotFoundException from "../exceptions/PostNotFoundException";
import IController from "../interfaces/IController";
import IUser from "./IUser";
import userModel from "./usersModel";

class IUsersController implements IController {
  public path = "/users";
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllIUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.put(`${this.path}/:id`, this.modifyUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.post(this.path, this.createUser);
  }

  public getAllIUsers = (response: express.Response) => {
    this.user.find()
    .then((posts) => {
      response.send(posts);
    });
  }

  public getUserById = (request: express.Request, response: express.Response, next: NextFunction) => {
    const id = request.params.id;
    this.user.findById(id)
    .then((user) => {
      if (user) {
        response.send(user);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  }

  public modifyUser = (request: express.Request, response: express.Response, next: NextFunction) => {
    const id = request.params.id;
    const userData: IUser = request.body;
    this.user.findByIdAndUpdate(id, userData, { new: true })
    .then((user) => {
      if (user) {
        response.send(user);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  }

  public deleteUser = (request: express.Request, response: express.Response, next: NextFunction) => {
    const id = request.params.id;
    this.user.findByIdAndDelete(id)
    .then((successResponse) => {
      if (successResponse) {
        response.sendStatus(200);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  }

  public createUser = (request: express.Request, response: express.Response) => {
    const userData = request.body;
    const createdIUser = new this.user(userData);
    createdIUser.save()
    .then((savedPost) => {
      response.send(savedPost);
    });
  }
}

export default IUsersController;
