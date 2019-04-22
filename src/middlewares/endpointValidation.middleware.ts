import { Request, Response } from "express";

export function endpointValidationMiddleware(
	request: Request,
	response: Response
) {
	response.status(404).send({
		status: 404,
		message: `${request.method} on endpoint ${request.url} not found`
	});
}
