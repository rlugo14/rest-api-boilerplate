import { createSchema, Type, typedModel } from "ts-mongoose";
import { AddressSchema } from "./address";

const UserSchema = createSchema({
	username: Type.string(),
	password: Type.string(),
	firstname: Type.optionalString(),
	lastname: Type.optionalString(),
	email: Type.string(),
	address: Type.optionalSchema().of(AddressSchema)
});

export const UserModel = typedModel("User", UserSchema);
