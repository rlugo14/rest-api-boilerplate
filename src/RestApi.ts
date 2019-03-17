import * as bodyParser from "body-parser";
import * as express from "express";
import UsersController from "./controllers/users.controller";
import errorMiddleware from "./middlewares/error.middleware";
import UsersRouter from "./routes/users.router";
import connectToDatabase from "./utils/databaseConnector";

class RestApi {
  public expressApp: express.Application;

  constructor(router: UsersRouter) {
    this.expressApp = express();
    this.expressApp.use("/", router.expressRouter);
    connectToDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  public listen() {
    this.expressApp.listen(process.env.PORT);
  }

 // private initializeRoutes(router) {
 //   router.initializeRouters(controller);
 // }

//  private initializeController(router) {
//    this.expressApp.use("/", router.expressRouter);
//  }

  private initializeMiddlewares() {
    this.expressApp.use(bodyParser.json());
  }

  private initializeErrorHandling() {
    this.expressApp.use(errorMiddleware);
  }

}

export default RestApi;
