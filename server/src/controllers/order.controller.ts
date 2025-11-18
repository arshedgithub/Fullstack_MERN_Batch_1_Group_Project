import type { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = OrderService.getInstance();
  }

  createOrder = async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      const newOrder = await this.orderService.createOrder(orderData);
      return { newOrder, status: 201, message: 'Order created successfully' };
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }     
  };

  getOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string;
      const order = await this.orderService.getOrderById(orderId);      
      if (order) {
        return { order, status: 200, message: 'Order fetched successfully' };
      } else {
        return { res, status: 404, message: 'Order not found' };
      }
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderService.getAllOrders();
      return { orders, status: 200, message: 'Orders fetched successfully' };
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }
  };

  updateOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string;  
      const updateData = req.body;
      const updatedOrder = await this.orderService.updateOrderById(orderId, updateData);
      if (updatedOrder) {
        return { updatedOrder, status: 200, message: 'Order updated successfully' };
      } else {
        return { res, status: 404, message: 'Order not found' };
      }
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }
  };

  deleteOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string;  
      const deletedOrder = await this.orderService.deleteOrderById(orderId);
      if (deletedOrder) {
        return { deletedOrder, status: 200, message: 'Order deleted successfully' };
      } else {
        return { res, status: 404, message: 'Order not found' };
      }
    } catch (error) {
      return { res, status: 500, message: 'Internal server error: ' + error };
    }

  };
}
