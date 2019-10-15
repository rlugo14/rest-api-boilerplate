import { createSchema, Type } from "ts-mongoose";

const genders = ["male", "female"] as const;

export const ContactPersonSchema = createSchema({
	firstname: Type.optionalString(),
	lastname: Type.optionalString(),
	gender: Type.optionalString({ enum: genders })
});
