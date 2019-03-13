import * as bodyParser from "body-parser";
import "dotenv/config";
import * as express from "express";
import * as mongoose from "mongoose";
import IController from "./interfaces/IController";
import errorMiddleware from "./middleware/errorMiddleware";

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
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      DB_CONNECTION_STRING,
      DB_SERVER,
    } = process.env;

    const DB_URL = `${DB_CONNECTION_STRING}${MONGO_USER}:${MONGO_PASSWORD}${DB_SERVER}`;

    mongoose.connect(DB_URL, {useNewUrlParser: true},
    (error: mongoose.Error) => {
      if (error) {
        // tslint:disable-next-line
        console.log("Initial database connection error: " + error.message);
      }
    });
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
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

}

export default App;
