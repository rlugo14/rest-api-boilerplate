import * as express from "express";
import UsersController from "../controllers/users.controller";

export interface IRouter {
    expressRouter: express.Router;
    initializeRoutes: (_: UsersController) => void;
}
