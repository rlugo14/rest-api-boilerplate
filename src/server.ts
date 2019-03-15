import RestApi from "./RestApi";
import UsersController from "./users/users.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();

const api = new RestApi(
  [
    new UsersController(),
  ]
);

api.listen();
