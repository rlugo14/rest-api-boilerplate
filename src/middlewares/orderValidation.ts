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
		.custom((value: string) => {
			const regex = /^DE[0-9]{9}/gm;
			const filteredValue = regex.exec(value);
			if (filteredValue === null) {
				throw new Error("value is not a valid VAT (DE)[0-9]{9}");
			} else {
				return filteredValue;
			}
		})
		.isLength({ min: 11, max: 11 })
		.withMessage("a valid VAT contains 11 characters (DE)[0-9]{9}")
		.isString()
		.withMessage("value should be a string"),

	body("phoneNumber")
		.custom((value: string) => {
			const regex = /(^(\+49|0049|49)?)(0?(?!31|32)([2-9])([0-9])([0-9]{1,2})(\d{3,7}))/gm;
			const filteredValue = regex.exec(value);
			if (filteredValue === null) {
				throw new Error("value is not a valid german landline number");
			} else {
				return filteredValue;
			}
		})
		.isLength({ min: 10, max: 14 })
		.withMessage(
			"value too long or too short to be a valid landline number"
		),

	body("mobilePhoneNumber")
		.optional()
		.isMobilePhone("de-DE")
		.withMessage("value is not a valid german mobile number"),

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
