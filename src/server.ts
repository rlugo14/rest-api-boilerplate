import RestApi from "./RestApi";
import { AuthenticationRouter, UsersRouter } from "./routes";
import validateEnv from "./utils/validateEnv";

validateEnv();

const api = new RestApi([new UsersRouter(), new AuthenticationRouter()]);

api.listen();
