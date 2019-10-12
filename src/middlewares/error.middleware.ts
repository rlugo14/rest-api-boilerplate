import { Request, Response } from "express";
import { HttpException } from "../exceptions";

export function errorMiddleware(
	error: HttpException,
	request: Request,
	response: Response
): void {
	const status = error.status || 500;
	const message = error.message || "Something went wrong";
	response.status(status).send({
		status,
		message
	});
}
