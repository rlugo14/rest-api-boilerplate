import { mockRequest, mockResponse } from "mock-req-res";
import mockingoose from "mockingoose";
import { Error } from "mongoose";
import * as sinon from "sinon";
import { OrderModel } from "../models";
import { OrdersController } from "./orders";

const ordersController: OrdersController = new OrdersController();
let req;
let res;
let next;

const testPreConfig = (): void => {
	next = sinon.spy();
	mockingoose.resetAll();
	req = mockRequest();
	res = mockResponse();
};

describe("Orders controller 'getAll' method", () => {
	beforeEach(testPreConfig);
	afterEach(() => jest.restoreAllMocks());
	it("should set a status code of 200 when it finds documents", async () => {
		mockingoose(OrderModel).toReturn(Promise.resolve(), "find");
		await ordersController.getAll(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set a status code of 500 (Internal Server Error) when 'find' method gets rejected with error", async () => {
		mockingoose(OrderModel).toReturn(
			new Error("'find' method Error"),
			"find"
		);
		await ordersController.getAll(req, res, next);
		expect(next.args[0][0].status).toBe(500);
	});
});

describe("Orders controller 'getById' method", () => {
	beforeEach(testPreConfig);
	it("should set status code 200 when document exist", async () => {
		mockingoose(OrderModel).toReturn({}, "findOne");
		await ordersController.getById(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set status code 404 (Not Found) when document does not exist", async () => {
		mockingoose(OrderModel).toReturn(null, "findOne");
		await ordersController.getById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});

	it("should set status code 422 (Unprocessable Entity) 'findById' method gets rejected with Error", async () => {
		mockingoose(OrderModel).toReturn(
			new Error("'findById' method Error"),
			"findOne"
		);
		await ordersController.getById(req, res, next);
		expect(next.args[0][0].status).toBe(422);
	});
});

describe("Orders controller 'deleteById' method", () => {
	beforeEach(testPreConfig);
	it("should set status code 200 when document deleted successfully", async () => {
		mockingoose(OrderModel).toReturn(Promise.resolve(), "findOneAndDelete");
		await ordersController.deleteById(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set status code 404 (Not Found) when 'foundOneAndDelete' method returns no document", async () => {
		mockingoose(OrderModel).toReturn(null, "findOneAndDelete");
		await ordersController.deleteById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});

	it("should set status code 422 (Unprocessable Entity) when 'foundOneAndDelete' rejects with Error", async () => {
		mockingoose(OrderModel).toReturn(
			new Error("'findByIdAndDelete' method Error"),
			"findOneAndDelete"
		);
		await ordersController.deleteById(req, res, next);
		expect(next.args[0][0].status).toBe(422);
	});
});

describe("Orders controller 'updateById' method", () => {
	beforeEach(testPreConfig);
	it("should set status code 200 when document updated successfully", async () => {
		mockingoose(OrderModel).toReturn(Promise.resolve(), "findOneAndUpdate");
		await ordersController.updateById(req, res, next);
		expect(res.status.args[0][0]).toBe(200);
	});

	it("should set status code 404 (Not Found) when 'foundOneAndUpdate' method returns no document", async () => {
		mockingoose(OrderModel).toReturn(null, "findOneAndUpdate");
		await ordersController.updateById(req, res, next);
		expect(next.args[0][0].status).toBe(404);
	});

	it("should set status code 422 (Unprocessable Entity) when 'foundOneAndUpdate' rejects with Error", async () => {
		mockingoose(OrderModel).toReturn(
			new Error("'findByIdAndUpdate' method Error"),
			"findOneAndUpdate"
		);
		await ordersController.updateById(req, res, next);
		expect(next.args[0][0].status).toBe(422);
	});
});

describe("Orders controller 'create' method", () => {
	beforeEach(testPreConfig);
	it("should set a status code of 200 when it creates new document", async () => {
		jest.spyOn(OrderModel.prototype, "save").mockImplementationOnce(() =>
			Promise.resolve()
		);
		await ordersController.create(req, res, next);
	});

	it("should set a status code of 500 (Internal Server Error) when 'save' method gets rejected with error", async () => {
		mockingoose(OrderModel).toReturn(
			new Error("'save' method Error"),
			"save"
		);
		await ordersController.create(req, res, next);
		expect(next.args[0][0].status).toBe(500);
	});
});
