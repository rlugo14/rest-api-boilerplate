interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    city: string;
    country: string;
    houseNumber: string;
    street: string;
    postNumber: number;
  };
  }

export default IUser;
