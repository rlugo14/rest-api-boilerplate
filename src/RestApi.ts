import * as bodyParser from "body-parser";
import * as express from "express";
import { errorMiddleware, userChecksMiddleware } from "./middlewares";
import { IRouter } from "./interfaces";
import connectToDatabase from "./utils/databaseConnector";

class RestApi {
	public expressApp: express.Application = express();

	constructor(router: IRouter[]) {
		connectToDatabase();
		this.initializeMiddlewares();
		this.initializeRouter(router);
		this.initializeErrorHandling();
	}

	public listen() {
		this.expressApp.listen(process.env.PORT);
	}

	private initializeRouter(routers: IRouter[]) {
		routers.forEach((router) => {
			this.expressApp.use("/", router.expressRouter);
		});
	}

	private initializeMiddlewares() {
		this.expressApp.use(bodyParser.json());
	}

	private initializeErrorHandling() {
		this.expressApp.use(errorMiddleware);
	}

}

export default RestApi;
