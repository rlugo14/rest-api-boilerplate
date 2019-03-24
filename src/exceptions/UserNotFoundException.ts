import { HttpException } from "./HttpException";

export class UserNotFoundException extends HttpException {
	constructor(id: string) {
		super(404, `User with id ${id} not found`);
}
}
