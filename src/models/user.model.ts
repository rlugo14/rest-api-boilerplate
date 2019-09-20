import * as mongoose from "mongoose";
import { prop, Typegoose } from "typegoose";
import { Address } from "./address.model";

export class User extends Typegoose {
	@prop({ required: true })
	public username: string;

	@prop({ required: true })
	public password?: string;

	@prop()
	public firstname?: string;

	@prop()
	public lastname?: string;

	@prop({required: true})
	public email: string;

	@prop()
	public address?: Address;
}

export const UserModel: mongoose.Model<
	mongoose.Document
> = new User().getModelForClass(User);
