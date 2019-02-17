interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    address: {
      street: string;
      houseNumber: string;
      postNumber: number;
      city: string;
      country: string;
  };
  }

  export default User;