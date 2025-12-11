import { Request, Response } from 'express';
import { OrderDao } from "../dao/order.dao";
import { ProductDao } from "../dao/product.dao";

export class OrderController {
  private orderDao: OrderDao; 
  private productDao: ProductDao; 

  constructor() {
    this.orderDao = OrderDao.getInstance();
    this.productDao = ProductDao.getInstance();
  }

    createOrder = async (req: Request, res: Response) => {
        try {
            const orderData = req.body;

            // 1. Basic Validation: Ensure items array exists
            if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
                return res.status(400).json({ message: 'Order must contain at least one item.' });
            }

            // 2. Validate ProductID
            const productValidationPromises = orderData.items.map(async (item: any, index: number) => {
                
                if (!item.productId) {
                    throw new Error(`Item at index ${index} is missing productId`);
                }

                // Call Product Module with the SPECIFIC ID string
                const product = await this.productDao.findProductById(item.productId);
                
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                
                return product;
            });

            await Promise.all(productValidationPromises);

            // 3. Create Order
            const newOrder = await this.orderDao.createOrder(orderData);

            return res.status(201).json({ 
                message: 'Order created successfully', 
                data: newOrder 
            });

        } catch (error: any) {
            console.error('Create Order Error:', error);

            if (error.message.includes('not found') || error.message.includes('missing productId')) {
                return res.status(400).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal server error: ' + error.message });
        }     
    };


  getOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string;
      const order = await this.orderDao.getOrderById(orderId);      
      if (order) {
        
        return res.status(200).json({ order, message: 'Order fetched successfully' });
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error: ' + error });
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = await this.orderDao.getAllOrders();
      return res.status(200).json({ orders, message: 'Orders fetched successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error: ' + error });
    }
  };

  updateOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string;  
      const updateData = req.body;
      const updatedOrder = await this.orderDao.updateOrderById(orderId, updateData);
      if (updatedOrder) {
        return res.status(200).json({ updatedOrder, message: 'Order updated successfully' });
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error: ' + error });
    }
  };

  deleteOrderById = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id as string;  
      const deletedOrder = await this.orderDao.deleteOrderById(orderId);
      if (deletedOrder) {
        return res.status(200).json({ message: 'Order deleted successfully' });
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error: ' + error });
    }

  };
}
