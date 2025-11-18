import { type Application, Router } from 'express';
import UserRoutes from './user.route';
import OrderRoutes from './order.route';

export async function SetRoutes(app: Application) {
    const router = Router();

    app.use('/api', router);

    new UserRoutes(router);
    new OrderRoutes(router);

    app.use((req, res) => {
        return { res, status: 404, message: "API not found"}
    });

}