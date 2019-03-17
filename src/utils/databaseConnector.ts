import "dotenv/config";
import * as mongoose from "mongoose";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const {
    MONGO_USER,
    MONGO_PASSWORD,
    DB_CONNECTION_STRING,
    DB_SERVER
} = process.env;

export default function connectToDatabase(): void {

    const DB_URL = `${DB_CONNECTION_STRING}${MONGO_USER}:${MONGO_PASSWORD}${DB_SERVER}`;

    mongoose.connect(DB_URL).then(
        () => {
            // tslint:disable-next-line: no-console
            console.log("Database connected successfully!!!");
        },
        (error: mongoose.Error) => {
            // tslint:disable-next-line: no-console
            console.log("Database connection error: " + error.message);
        }
    );
}
