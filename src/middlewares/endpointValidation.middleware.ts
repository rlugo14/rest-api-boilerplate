import { Request, Response } from "express";

export function endpointValidationMiddleware(
	request: Request,
	response: Response
) {
	response
		.status(404)
		.send({ status: 404, message: `Endpoint ${request.url} not found` });
}
