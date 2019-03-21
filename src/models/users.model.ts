import { Typegoose, prop, Ref } from "typegoose";

class Address {

	@prop({required: true})
	city: string;

	@prop({required: true})
	country: string;

	@prop({required: true})
	houseNumber: string;

	@prop({required: true})
	street: string;

	@prop({required: true})
	postNumber: number;
}
export class User extends Typegoose {

	@prop()
	username: string;

	@prop()
	firstname: string;

	@prop()
	lastname: string;

	@prop()
	email: string;

	@prop()
	address?: Address;
}

export const UserModel = new User().getModelForClass(User);
