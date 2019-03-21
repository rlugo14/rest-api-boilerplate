import { Model } from "mongoose";
import { prop, Ref, Typegoose } from "typegoose";
import { Address } from "./address.model";

export class User extends Typegoose {

	@prop()
	public username: string;

	@prop()
	public firstname: string;

	@prop()
	public lastname: string;

	@prop()
	public email: string;

	@prop()
	public address: Address;
}

export const UserModel: Model<User> = new User().getModelForClass(User);
