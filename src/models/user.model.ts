import { IAddress } from "./address.model";

export interface IUser {
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	address?: IAddress;
}
