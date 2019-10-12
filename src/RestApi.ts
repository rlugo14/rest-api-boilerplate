import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import { Router } from "./interfaces";
import { errorMiddleware, endpointValidationMiddleware } from "./middlewares";
import { connectToDatabase } from "./utils";

class RestApi {
	public expressApp: express.Application = express();

	constructor(router: Router[]) {
		connectToDatabase();
		this.initializeMiddlewares();
		this.initializeRouter(router);
		this.initializeErrorHandling();
	}

	public listen(): void {
		this.expressApp.listen(process.env.PORT);
	}

	private initializeRouter(routers: Router[]): void {
		routers.forEach(router => {
			this.expressApp.use("/", router.expressRouter);
		});
	}

	private initializeMiddlewares(): void {
		this.expressApp.use(bodyParser.json());
		this.expressApp.use(cookieParser());
	}

	private initializeErrorHandling(): void {
		this.expressApp.use(endpointValidationMiddleware);
		this.expressApp.use(errorMiddleware);
	}
}

export default RestApi;
