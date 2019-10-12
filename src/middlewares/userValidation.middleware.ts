import { NextFunction } from "connect";
import * as express from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import { body, validationResult } from "express-validator/check";

export const userValidationMiddleware: RequestHandlerParams = [
	body("username")
		.exists()
		.withMessage("value is required")
		.isAlphanumeric()
		.withMessage("value should be alphanumeric"),

	body("password")
		.exists()
		.withMessage("value is required")
		.isString()
		.withMessage("value should be a string"),

	body("email")
		.exists()
		.withMessage("value is required")
		.isEmail()
		.withMessage("value should be a valid email"),

	body("firstname")
		.optional()
		.isString()
		.withMessage("value should be a string"),

	body("lastname")
		.optional()
		.isString()
		.withMessage("value should be a string"),

	body("address.city")
		.optional()
		.isString()
		.withMessage("value should be a string"),

	body("address.country")
		.optional()
		.isString()
		.withMessage("value should be a string"),

	body("address.houseNumber")
		.optional()
		.isAlphanumeric()
		.withMessage("value should be a alphanumeric"),

	body("address.street")
		.optional()
		.isString()
		.withMessage("value should be a string"),

	body("address.postNumber")
		.optional()
		.isPostalCode("DE")
		.withMessage("value should be a german postal code"),

	(req: express.Request, res: express.Response, next: NextFunction): void => {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			res.status(400).json({
				status: 400,
				message: "Bad Request",
				errors: validationErrors.array()
			});
		} else {
			next();
		}
	}
];
