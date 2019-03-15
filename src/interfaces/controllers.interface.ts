import { NextFunction } from "connect";
import { Application, Request, Response } from "express";
import UserSchema from "../models/users.models";
interface IController {
    app: Application;
    path: string;
    UserSchema: UserSchema;
    getAll: (req: Request, res: Response, next: NextFunction) => void;
    getById: (req: Request, res: Response, next: NextFunction) => void;
    create: (req: Request, res: Response, next: NextFunction) => void;
    updateById: (req: Request, res: Response, next: NextFunction) => void;
    deleteById: (req: Request, res: Response, next: NextFunction) => void;

}

export default IController;
