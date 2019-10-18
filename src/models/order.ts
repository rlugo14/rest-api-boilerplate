import { createSchema, Type, typedModel } from "ts-mongoose";
import { AddressSchema } from "./address";
import { ContactPersonSchema } from "./contactPerson";

const OrderSchema = createSchema({
	restaurant: Type.string(),
	contactPerson: Type.schema().of(ContactPersonSchema),
	address: Type.schema().of(AddressSchema),
	phoneNumber: Type.number(),
	mobilePhoneNumber: Type.optionalNumber(),
	email: Type.string(),
	vat: Type.string(),
	orderNumber: Type.number(),
	orderCreationDate: Type.date()
});

export const OrderModel = typedModel("Order", OrderSchema);
