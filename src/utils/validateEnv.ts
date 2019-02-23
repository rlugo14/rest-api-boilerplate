import { cleanEnv, port, str } from "envalid";

export default function validateEnv() {

    cleanEnv(process.env, {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_PREFIX: str(),
        MONGO_PATH: str(),
        PORT: port(),
    });
}
