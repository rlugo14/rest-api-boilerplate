import { HttpException } from "./HttpException";

export class OrderNotFoundException extends HttpException {
	constructor(id: string) {
		super(404, `Order with id ${id} not found`);
	}
}
