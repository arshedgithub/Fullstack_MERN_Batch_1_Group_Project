import { type Router } from "express";
import { OrderController } from "../controllers/order.controller";

export default class OrderRoutes {
    private OrderController: OrderController;

    constructor(private router: Router) {
        this.OrderController = new OrderController();
        this.configureRoutes();
    }

    private configureRoutes() {

        // Create api/orders/
        this.router.post('/orders', this.OrderController.createOrder);

        // GET api/orders/
        this.router.get('/orders', this.OrderController.getAllOrders);

        // GET api/order/:id
        this.router.get('/order/:id', this.OrderController.getOrderById);

        // PUT api/order/:id
        this.router.put('/order/:id', this.OrderController.updateOrderById);

        // DELETE api/order/:id
        this.router.delete('/order/:id', this.OrderController.deleteOrderById);
    }
}