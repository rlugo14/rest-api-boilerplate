import * as bodyParser from "body-parser";
import "dotenv/config";
import * as express from "express";
import * as mongoose from "mongoose";
import IController from "./interfaces/controllers.interface";
import errorMiddleware from "./middleware/error.middleware";

const {
  MONGO_USER,
  MONGO_PASSWORD,
  DB_CONNECTION_STRING,
  DB_SERVER,
  PORT
} = process.env;

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private connectToDatabase() {
    const DB_URL = `${DB_CONNECTION_STRING}${MONGO_USER}:${MONGO_PASSWORD}${DB_SERVER}`;

    mongoose.connect(DB_URL, {useNewUrlParser: true}).then(
      () => {
        // tslint:disable-next-line: no-console
        console.log("Database connected successfully!!!");
      },
      (error: mongoose.Error) => {
        // tslint:disable-next-line: no-console
        console.log("Database connection error: " + error.message);
      }
    );
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
    this.app.listen(PORT, () => {
      // tslint:disable-next-line
      console.log(`App listening on the port ${PORT}`);
    });
  }

}

export default App;
