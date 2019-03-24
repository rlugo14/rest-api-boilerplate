import { NextFunction } from "connect";
import * as express from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import { body, validationResult } from "express-validator/check";

export const orderValidationMiddleware: RequestHandlerParams = [
	body("restaurant")
		.isString()
		.withMessage("value should be a string"),

	body("contactPerson")
		.not()
		.isEmpty()
		.withMessage("value not be empty"),

	body("contactPerson.firstname")
		.optional()
		.isString()
		.withMessage("value should be a string"),

	body("contactPerson.lastname")
		.isString()
		.withMessage("value should be a string"),

	body("contactPerson.gender")
		.isString()
		.withMessage("value should be a string"),

	body("email")
		.isEmail()
		.withMessage("value should be a valid email"),

	body("vat")
		.isString()
		.withMessage("value should be a string"),

	body("phoneNumber")
		.isMobilePhone("de-DE")
		.withMessage("value should be a valid german mobile phonenumber"),

	body("orderNumber")
		.isNumeric()
		.withMessage("value should be a number"),

	body("orderCreationDate")
		.toDate()
		.withMessage("value should be a valid date"),

	body("address")
		.not()
		.isEmpty()
		.withMessage("value should not be empty"),

	body("address.city")
		.isString()
		.withMessage("value should be a string"),

	body("address.country")
		.isString()
		.withMessage("value should be a string"),

	body("address.houseNumber")
		.isAlphanumeric()
		.withMessage("value should be a alphanumeric"),

	body("address.street")
		.isString()
		.withMessage("value should be a string"),

	body("address.postNumber")
		.isPostalCode("DE")
		.withMessage("value should be a german postal code"),

	(req: express.Request, res: express.Response, next: NextFunction) => {
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
