import * as express from "express";
import { Controller } from "./controller";

export interface Router {
	expressRouter: express.Router;
	initializeRoutes: (_: Controller) => void;
}
