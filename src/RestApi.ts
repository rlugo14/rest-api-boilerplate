import * as bodyParser from "body-parser";
import * as express from "express";
import IController from "./interfaces/controllers.interface";
import errorMiddleware from "./middlewares/error.middleware";
import connectToDatabase from "./utils/databaseConnector";

class RestApi {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      // tslint:disable-next-line
      console.log(`Rest API listening on the port ${process.env.PORT}`);
    });
  }

}

export default RestApi;
