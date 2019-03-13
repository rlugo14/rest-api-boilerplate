import { cleanEnv, port, str } from "envalid";

export default function validateEnv() {

    cleanEnv(process.env, {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        DB_CONNECTION_STRING: str(),
        DB_SERVER: str(),
        PORT: port(),
    });
}
