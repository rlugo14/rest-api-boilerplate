import * as bodyParser from "body-parser";
import "dotenv/config";
import * as express from "express";
import * as mongoose from "mongoose";
import IController from "./interfaces/IController";

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      // tslint:disable-next-line
      console.log(`App listening on the port ${process.env.PORT}`);
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

  private connectToDatabase() {
    const {
      MONGO_PREFIX,
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;

    mongoose.connect(`${MONGO_PREFIX}${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true });
  }
}

export default App;
