import { NextFunction } from "connect";
import * as express from "express";
import HttpException from "../exceptions/HttpException";
import UserNotFoundException from "../exceptions/UsertNotFoundException";
import IController from "../interfaces/controllers.interface";
import validationMiddleware from "../middleware/validation.middleware";
import CreateAddressDto from "./adresses/addresses.dto";
import { CreateUserDto } from "./users.dto";
import IUser from "./users.interface";
import userModel from "./users.model";

class UsersController implements IController {
  public path = "/users";
  public router = express.Router();
  private user = userModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.put(`${this.path}/:id`, this.modifyUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
    this.router.post(this.path, validationMiddleware(CreateUserDto), this.createUser);
  }

  public getAllUsers = (request: express.Request, response: express.Response) => {
    this.user.find({})
    .then((users) => {
      response.send(users);
    });
  }

  public getUserById = (request: express.Request, response: express.Response, next: NextFunction) => {
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

  public modifyUser = (request: express.Request, response: express.Response, next: NextFunction) => {
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

  public deleteUser = (request: express.Request, response: express.Response, next: NextFunction) => {
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

  public createUser = (request: express.Request, response: express.Response) => {
    const userData = request.body;
    const createdIUser = new this.user(userData);
    createdIUser.save()
    .then((savedPost) => {
      response.send(savedPost);
    });
  }
}

export default UsersController;
