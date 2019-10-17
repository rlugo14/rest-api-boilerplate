import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

export function errorMiddleware(
	error: HttpException,
	request: Request,
	response: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
): void {
	const status = error.status || 500;
	const message = error.message || "Something went wrong";
	response.status(status).send({
		status,
		message
	});
}
