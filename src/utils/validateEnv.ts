import { cleanEnv, str, num } from "envalid";

export function validateEnv(): void {
	cleanEnv(process.env, {
		MONGO_USER: str(),
		MONGO_PASSWORD: str(),
		DB_CONNECTION_STRING: str(),
		DB_SERVER: str(),
		PORT: num(),
		JWT_SECRET: str()
	});
}
