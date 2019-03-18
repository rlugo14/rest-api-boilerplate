import { IAddress } from "../interfaces";

export interface IUser {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	address: IAddress;
  }
