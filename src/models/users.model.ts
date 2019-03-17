import { Document, model, Schema } from "mongoose";
import { IUser } from "../interfaces";

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

const userModel = model<IUser & Document>("User", userSchema);

export default userModel;
