import RestApi from "./RestApi";
import { AuthenticationRouter, OrdersRouter, UsersRouter } from "./routes";
import { validateEnv } from "./utils";

validateEnv();

const api = new RestApi([
	new AuthenticationRouter(),
	new OrdersRouter(),
	new UsersRouter()
]);

api.listen();
