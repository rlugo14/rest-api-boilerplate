import * as express from "express";
import { IController } from "./controllers.interface";

export interface IRouter {
	expressRouter: express.Router;
	initializeRoutes: (_: IController) => void;
}
