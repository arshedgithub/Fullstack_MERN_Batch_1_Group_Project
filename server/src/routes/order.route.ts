import { type Router } from "express";
import { OrderController } from "../controllers/order.controller";

export default class OrderRoutes {
    private OrderController: OrderController;

    constructor(private router: Router) {
        this.OrderController = new OrderController();
        this.configureRoutes();
    }

    private configureRoutes() {

        // Create api/Orders/
        this.router.post('/orders', this.OrderController.createOrder);

        // GET ALL api/Orders/
        this.router.get('/orders', this.OrderController.getAllOrders);

        // GET api/orders/:id
        this.router.get('/orders/:id', this.OrderController.getOrderById);

        // PUT api/orders/:id
        this.router.put('/orders/:id', this.OrderController.updateOrderById);

        // DELETE api/orders/:id
        this.router.delete('/orders/:id', this.OrderController.deleteOrderById);

    }

}
