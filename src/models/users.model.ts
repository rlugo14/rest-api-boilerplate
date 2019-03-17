// tslint:disable: member-access
import { prop, Typegoose } from "typegoose";

class AddressSchema extends Typegoose {
    @prop()
    city: string;

    @prop()
    country: string;

    @prop()
    houseNumber: string;

    @prop()
    street: string;

    @prop()
    postNumber: number;
}

// tslint:disable-next-line: max-classes-per-file
export default class UserSchema extends Typegoose {

    @prop({ unique: true })
    username: string;

    @prop()
    firstname: string;

    @prop()
    lastname: string;

    @prop()
    email: string;

    @prop()
    address: AddressSchema;
}
