import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { HttpException } from "./exceptions";
import { IRouter } from "./interfaces";
import { errorMiddleware } from "./middlewares";
import { endpointValidationMiddleware } from "./middlewares/endpointValidation.middleware";
import { connectToDatabase } from "./utils";

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
		routers.forEach(router => {
			this.expressApp.use("/", router.expressRouter);
		});
	}

	private initializeMiddlewares() {
		this.expressApp.use(bodyParser.json());
		this.expressApp.use(cookieParser());
	}

	private initializeErrorHandling() {
		this.expressApp.use(endpointValidationMiddleware);
		this.expressApp.use(errorMiddleware);
	}
}

export default RestApi;
