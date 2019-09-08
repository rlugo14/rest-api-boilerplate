import { prop } from "@hasezoey/typegoose";
export class Address {
	@prop()
	public city: string;

	@prop()
	public country: string;

	@prop()
	public houseNumber: string;

	@prop()
	public street: string;

	@prop()
	public postNumber: number;
}
