import UsersController from "./controllers/users.controller";
import RestApi from "./RestApi";
import UsersRouter from "./routes/users.router";
import connectToDatabase from "./utils/databaseConnector";
import validateEnv from "./utils/validateEnv";

validateEnv();
const dbConnection = connectToDatabase();

const api = new RestApi(new UsersRouter(dbConnection));

api.listen();
