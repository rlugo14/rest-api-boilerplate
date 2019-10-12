import { prop } from "typegoose";

enum Gender {
	MALE = "male",
	FEMALE = "female"
}

export class ContactPerson {
	@prop()
	public firstname: string;

	@prop()
	public lastname: string;

	@prop({ enum: Gender })
	public gender: Gender;
}
