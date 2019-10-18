import "dotenv/config";
import { AuthenticationController } from "./authentication";
import { UserModel } from "../models";
import mockingoose from "mockingoose";
import { mockRequest, mockResponse } from "mock-req-res";
import * as sinon from "sinon";
import * as bcrypt from "bcrypt";

const authenticationController: AuthenticationController = new AuthenticationController();
let req;
let res;
let next;
let mockedBcrypt;
process.env.JWT_SECRET = "mySecretForTests";

const testPreConfig = (): void => {
	mockingoose.resetAll();
	next = sinon.spy();
	req = mockRequest({
		body: {
			email: "testEmail",
			password: "testPassword",
			username: "testUsername"
		}
	});
	res = mockResponse();
	mockedBcrypt = sinon.mock(bcrypt);
};

describe("Authentication controller 'register' method", () => {
	beforeEach(testPreConfig);

	it("should set a status code of 400 (Bad Request) when user exists", async () => {
		mockingoose(UserModel).toReturn(req.body, "findOne");
		await authenticationController.register(req, res, next);
		expect(next.args[0][0].status).toBe(400);
	});

	it("should set a cookie header after user registration", async () => {
		mockingoose(UserModel).toReturn(req.body, "save");
		await authenticationController.register(req, res, next);
		expect(res.setHeader.args[0][0]).toBe("Set-Cookie");
	});
});

describe("Authentication controller 'login' method", () => {
	beforeEach(testPreConfig);

	afterEach(() => {
		mockedBcrypt.restore();
	});

	it("should set a status code of 401 (Unauthorized) when user does not exist", async () => {
		mockingoose(UserModel).toReturn(null, "findOne");
		await authenticationController.login(req, res, next);
		expect(next.args[0][0].status).toBe(401);
	});

	it("should set a Cookie after successfully login", async () => {
		mockedBcrypt.expects("compare").returns(true);
		mockingoose(UserModel).toReturn(req.body, "findOne");
		await authenticationController.login(req, res, next);
		expect(res.setHeader.args[0][0]).toBe("Set-Cookie");
	});

	it("should set a status code of 401 (Unauthorized) when passwords do not match", async () => {
		mockedBcrypt.expects("compare").returns(false);
		mockingoose(UserModel).toReturn(req.body, "findOne");
		await authenticationController.login(req, res, next);
		expect(next.args[0][0].status).toBe(401);
	});
});

describe("Authentication controller 'logout' method", () => {
	beforeEach(testPreConfig);
	it("should set an empty Authorization Cookie after logout", async () => {
		await authenticationController.logout(req, res);
		expect(res.setHeader.args[0][0]).toBe("Set-Cookie");
		expect(res.setHeader.args[0][1]).toBe("Authorization=;Max-age=0");
	});

	it("should set a status code of 200 when successfully logout", async () => {
		await authenticationController.logout(req, res);
		expect(res.status.args[0][0]).toBe(200);
	});
});
