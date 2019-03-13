import App from "./app";
import UsersController from "./users/users.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App(
  [
    new UsersController(),
  ]
);

app.listen();
