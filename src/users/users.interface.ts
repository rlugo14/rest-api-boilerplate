import Address from "./adresses/addresses.interface";

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  }

export default IUser;
