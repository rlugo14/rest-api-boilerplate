import { HttpException } from "./HttpException";

export class ObjectNotFoundException extends HttpException {
	constructor(modelName: string,id: string) {
		super(404, `${modelName} with id ${id} not found`);
}
}
