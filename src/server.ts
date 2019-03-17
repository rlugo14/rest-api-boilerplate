import RestApi from "./RestApi";
import UsersRouter from "./routes/users.router";
import validateEnv from "./utils/validateEnv";

validateEnv();

const api = new RestApi(new UsersRouter());

api.listen();
