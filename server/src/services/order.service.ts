import { OrderDao } from "../dao/order.dao";
import type { IOrder } from "../models/order.model";

export class OrderService {
    private static instance: OrderService;
    private orderDao: OrderDao;

    private constructor() {
        this.orderDao = OrderDao.getInstance();
    }

    public static getInstance(): OrderService {
        if (!this.instance) {
            this.instance = new OrderService();
        }
        return this.instance;
    }

    public async getAllOrders(): Promise<IOrder[]> {
        try {
            return await this.orderDao.getAllOrders();
        } catch (error) {
            throw error;
        }
    }

    public async createOrder(
        orderData: Partial<IOrder>,
    ): Promise<IOrder | null> {
        try {
            return await this.orderDao.createOrder(orderData);
        } catch (error) {
            throw error;
        }
    }

    public async getOrderById(id: string): Promise<IOrder | null> {
        try {
            return await this.orderDao.getOrderById(id);
        } catch (error) {
            throw error;
        }
    }

    public async updateOrderById(
        orderId: string,
        updateData: Partial<IOrder>,
    ): Promise<IOrder | null> {
        try {
            return await this.orderDao.updateOrderById(orderId, updateData);
        } catch (error) {
            throw error;
        }
    }   

    public async deleteOrderById(orderId: string): Promise<IOrder | null> {
        try {
            return await this.orderDao.deleteOrderById(orderId);
        } catch (error) {
            throw error;
        }
    }
}
