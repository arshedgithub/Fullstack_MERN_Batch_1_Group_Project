import { type Router } from "express";
import { UserController } from "../controllers/user.controller";

export default class UserRoutes {
    private UserController: UserController;

    constructor(private router: Router) {
        this.UserController = new UserController();
        this.configureRoutes();
    }

    private configureRoutes() {
        // POST api/users/register
        this.router.post('/users/register', this.UserController.register);

        // GET api/users/
        this.router.get('/users', this.UserController.getAllUsers);

        // GET api/users/:id
        this.router.get('/users/:id', this.UserController.getUserProfile)
    }
}