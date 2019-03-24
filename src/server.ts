import RestApi from "./RestApi";
import { AuthenticationRouter, OrdersRouter, UsersRouter } from "./routes";
import { validateEnv } from "./utils";

validateEnv();

const api = new RestApi([
	new UsersRouter(),
	new AuthenticationRouter(),
	new OrdersRouter()
]);

api.listen();
