import * as express from "express";
import IUser from "./IUser";

class UsersController {
  public path = "/users";
  public router = express.Router();

  private users: IUser[] = [
    {
      username: "rlugo14",
      firstName: "Raul",
      lastName: "Lugo",
      email: "rlugo14@gmail.com",
      address: {
        city: "Duesseldorf",
        country: "Germany",
        houseNumber: "2",
        postNumber: 40227,
        street: "Schmiedestrasse",
      },
    }
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(this.path, this.createAUser);
  }

  public getAllUsers = (request: express.Request, response: express.Response) => {
    response.send(this.users);
  }

  public createAUser = (request: express.Request, response: express.Response) => {
    const user: IUser = request.body;
    this.users.push(user);
    response.send(user);
  }

}

export default UsersController;
