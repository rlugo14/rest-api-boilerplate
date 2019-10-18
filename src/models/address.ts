import { createSchema, Type } from "ts-mongoose";

export const AddressSchema = createSchema({
	city: Type.string(),
	country: Type.string(),
	houseNumber: Type.string(),
	street: Type.string(),
	postNumber: Type.number()
});
