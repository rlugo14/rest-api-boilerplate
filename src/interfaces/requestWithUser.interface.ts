import { Request } from "express";
import { User } from "../models";

export interface IRequestWithUser extends Request {
	request: import("mongoose").Document;
	[x: string]: import("mongoose").Document;
	user: User;
  }
