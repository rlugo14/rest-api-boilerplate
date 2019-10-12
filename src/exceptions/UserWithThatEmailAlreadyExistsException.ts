import { HttpException } from "./HttpException";

export class UserWithThatEmailAlreadyExistsException extends HttpException {
	constructor(email: string) {
		super(400, `User with email ${email} already exists`);
	}
}
