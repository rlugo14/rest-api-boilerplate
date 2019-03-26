import { Request } from "express";
import { User } from "src/models";

export interface IRequestWithUser extends Request {
	user: User;
  }
