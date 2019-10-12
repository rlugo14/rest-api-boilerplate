import * as express from "express";
import { Controller } from "./controllers.interface";

export interface Router {
	expressRouter: express.Router;
	initializeRoutes: (_: Controller) => void;
}
