import * as express from "express";
import { validationResult, body } from "express-validator/check";
import { NextFunction } from "connect";

export const userChecks = [
	body("username")
		.exists()
		.isAlphanumeric()
		.withMessage("param should be alphanumeric"),

	body("firstname")
		.isString()
		.withMessage("param should be a string"),

	body("lastname")
		.isString()
		.withMessage("param should be a string"),

	body("email")
		.isEmail()
		.withMessage("param should be a valid email"),

	body("address")
		.not().isEmpty()
		.withMessage("param address should not be empty"),

	body("address.city")
		.isString()
		.withMessage("param should be a string"),

	body("address.country")
		.isString()
		.withMessage("param should be a string"),

	body("address.houseNumber")
		.isAlphanumeric()
		.withMessage("param should be a alphanumeric"),

	body("address.street")
		.isString()
		.withMessage("param should be a string"),

	body("address.postNumber")
		.isPostalCode("DE")
		.withMessage("param should be a german postal code"),

	function (req: express.Request, res: express.Response, next: NextFunction) {
		const validationErrors = validationResult(req);
		if (!validationErrors.isEmpty()) {
			res.status(400).json({
				status: 400,
				message: "Bad Request",
				errors: validationErrors.array()})
		};
		next();
	},
]

