import express = require("express");
import UsersController from "../controllers/users.controller";
import Controller from "../interfaces/controllers.interface";

interface IRouter {
    expressRouter: express.Router;
    initializeRoutes: (_: UsersController) => void;
}

export default IRouter;
