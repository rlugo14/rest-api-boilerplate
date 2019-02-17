import App from './app';
import UsersController from './users/usersController';
import * as mongoose from 'mongoose';
import 'dotenv/config';

const {
  MONGO_PREFIX,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH,
} = process.env;

mongoose.connect(`${MONGO_PREFIX}${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useNewUrlParser: true });

const app = new App(
  [
    new UsersController(),
  ],
  5000,
);

app.listen();