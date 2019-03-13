import { Document, model, Schema } from "mongoose";
import User from "./users.interface";

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  address: {
      city: String,
      country: String,
      houseNumber: String,
      street: String,
      postNumber: Number
  },
});

const userModel = model<User & Document>("User", userSchema);

export default userModel;
