import * as express from 'express';
import IUser from './interfaces/IUsers';

class UsersController {
  public path = '/users';
  public router = express.Router();

  private users: IUser[] = [
    {
        username: 'rlugo14',
        firstName: 'Raul',
        lastName: 'Lugo',
        email: 'rlugo14@gmail.com',
        address: {
            street: 'Schmiedestrasse',
            houseNumber: '2',
            postNumber: 40227,
            city: 'Duesseldorf',
            country: 'Germany'
    }
    }
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.post(this.path, this.createAUser);
  }

  getAllUsers = (request: express.Request, response: express.Response) => {
    response.send(this.users);
  }

  createAUser = (request: express.Request, response: express.Response) => {
    const user: IUser = request.body;
    this.users.push(user);
    response.send(user);
  }

  deleteAUser = (request: express.Request, response: express.Response) => {

  }
}

export default UsersController;