import { createSchema, Type } from "ts-mongoose";

export const AddressSchema = createSchema({
	city: Type.optionalString(),
	country: Type.optionalString(),
	houseNumber: Type.optionalString(),
	street: Type.optionalString(),
	postNumber: Type.optionalNumber()
});
