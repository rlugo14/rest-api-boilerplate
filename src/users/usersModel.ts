import * as mongoose from "mongoose";
import User from "./IUser";

const userSchema = new mongoose.Schema({
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

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
