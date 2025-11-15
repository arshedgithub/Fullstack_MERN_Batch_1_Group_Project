import { type Application, Router } from 'express';
import UserRoutes from './user.route';

export async function SetRoutes(app: Application) {
    const router = Router();

    app.use('/api', router);

    new UserRoutes(router);

    app.use((req, res) => {
        return { res, status: 404, message: "API not found"}
    });

}