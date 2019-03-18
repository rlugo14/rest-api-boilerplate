import { NextFunction } from "connect";
import * as express from "express";
import { Request, Response } from "express";
import { Model, Mongoose } from "mongoose";
import { Typegoose } from "typegoose";
import UserSchema from "../models/users.model";
export interface IController {
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	getById: (req: Request, res: Response, next: NextFunction) => void;
	create: (req: Request, res: Response, next: NextFunction) => void;
	updateById: (req: Request, res: Response, next: NextFunction) => void;
	deleteById: (req: Request, res: Response, next: NextFunction) => void;

}
