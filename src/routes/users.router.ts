import * as express from "express";
import UsersController from "../controllers/users.controller";

class UsersRouter {
    public app: express.Application;
    private controller: UsersController;

    constructor(app: express.Application) {
        this.app = app;
        this.controller = new UsersController(app, this.path);
    }

    public initializeRoutes() {
        const path: string = "/users";
        const router = express.Router();

        router.get(`${path}`, this.controller.getAll);
        router.get(`${path}/:id`, this.controller.getById);
        router.post(`${path}`, this.controller.create);
        router.put(`${path}/:id`, this.controller.updateById);
        router.delete(`${path}/:id`, this.controller.deleteById);
    }
}

export default UsersRouter;
