import { mockRequest, mockResponse } from "mock-req-res";
import mockingoose from "mockingoose";
import { Error } from "mongoose";
import * as sinon from "sinon";
import { UserModel } from "../models";
import { UsersController } from "./users";

const usersController: UsersController = new UsersController();
let req;
let res;
let next;

const testPreConfig = (): void => {
	next = sinon.spy();
	mockingoose.resetAll();
	req = mockRequest({
		body: {
			email: "testEmail@email.com",
			password: "testPassword"
		}
	});
	res = mockResponse();
};

describe("Users controller 'getAll' method", () => {
	beforeEach(testPreConfig);
	afterEach(() => jest.restoreAllMocks());
	it("should set a status code of 200 when it finds documents", async () => {
		mockingoose(UserModel).toReturn(Promise.resolve(), "find");
		await usersController.getAll(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set a status code of 500 (Internal Server Error) when 'find' method gets rejected with error", async () => {
		mockingoose(UserModel).toReturn(
			new Error("'find' method Error"),
			"find"
		);
		await usersController.getAll(req, res, next);
		expect(next.args[0][0].status).toBe(500);
	});
});

describe("Users controller 'getById' method", () => {
	beforeEach(testPreConfig);
	it("should set status code 200 when document exist", async () => {
		mockingoose(UserModel).toReturn(req.body, "findOne");
		await usersController.getById(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set status code 404 (Not Found) when document does not exist", async () => {
		mockingoose(UserModel).toReturn(null, "findOne");
		await usersController.getById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});

	it("should set status code 422 (Unprocessable Entity) 'findById' method gets rejected with Error", async () => {
		mockingoose(UserModel).toReturn(
			new Error("'findById' method Error"),
			"findOne"
		);
		await usersController.getById(req, res, next);
		expect(next.args[0][0].status).toBe(422);
	});
});

describe("Users controller 'deleteById' method", () => {
	beforeEach(testPreConfig);
	it("should set status code 200 when document deleted successfully", async () => {
		mockingoose(UserModel).toReturn(Promise.resolve(), "findOneAndDelete");
		await usersController.deleteById(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set status code 404 (Not Found) when 'foundOneAndDelete' method returns no document", async () => {
		mockingoose(UserModel).toReturn(null, "findOneAndDelete");
		await usersController.deleteById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});

	it("should set status code 404 (Not Found) when 'foundOneAndDelete' method return no document", async () => {
		mockingoose(UserModel).toReturn(false);
		await usersController.deleteById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});
});

describe("Users controller 'updateById' method", () => {
	beforeEach(testPreConfig);
	it("should set status code 200 when document updated successfully", async () => {
		mockingoose(UserModel).toReturn({}, "findOneAndUpdate");
		await usersController.updateById(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set status code 404 (Not Found) when 'foundOneAndUpdate' method returns no document", async () => {
		mockingoose(UserModel).toReturn(false, "findOneAndUpdate");
		await usersController.updateById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});
});

describe("Users controller 'create' method", () => {
	beforeEach(testPreConfig);
	it("should set a status code of 200 when it creates new document", async () => {
		jest.spyOn(UserModel.prototype, "save").mockImplementationOnce(() =>
			Promise.resolve()
		);
		await usersController.create(req, res, next);
	});

	it("should set a status code of 500 (Internal Server Error) when 'save' method gets rejected with error", async () => {
		mockingoose(UserModel).toReturn(
			new Error("'save' method Error"),
			"save"
		);
		await usersController.create(req, res, next);
		expect(next.args[0][0].status).toBe(500);
	});
});
