import { Document, Model } from "mongoose";
import { prop, Typegoose } from "typegoose";
import { Address } from "./address.model";
import { ContactPerson } from "./contactPerson.model";

export class Order extends Typegoose {
	@prop({ required: true })
	public restaurant: string;

	@prop({ required: true })
	public contactPerson: ContactPerson;

	@prop({ required: true})
	public address: Address;

	@prop({ required: true })
	public phoneNumber: number;

	@prop({ required: true})
	public email: string;

	@prop({ required: true })
	public vat: string;

	@prop({ required: true})
	public orderNumber: number;

	@prop({ required: true})
	public orderCreationDate: Date;
}

export const OrderModel: Model<Document> = new Order().getModelForClass(Order);
