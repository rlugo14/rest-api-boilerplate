import { NextFunction } from "connect";
import { Request, Response } from "express";

export interface IController {
	getAll: (req: Request, res: Response, next: NextFunction) => void;
	getById: (req: Request, res: Response, next: NextFunction) => void;
	create: (req: Request, res: Response, next: NextFunction) => void;
	updateById: (req: Request, res: Response, next: NextFunction) => void;
	deleteById: (req: Request, res: Response, next: NextFunction) => void;
}
