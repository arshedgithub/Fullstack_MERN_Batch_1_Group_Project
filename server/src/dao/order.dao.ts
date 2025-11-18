import Order, { type IOrder } from '../models/order.model';

export class OrderDao {
    public static instance: OrderDao;

    static getInstance = (): OrderDao => {
        if (!this.instance) {
            this.instance = new OrderDao();
        }
        return this.instance;
    }

// CRUD operations for Order, 
//create Order
    public async createOrder(orderData: Partial<IOrder>) {
        try {
            console.log("Creating order with data:", orderData);
            const order = new Order(orderData);
            return await order.save();
        } catch (error) {
            console.log("Something went wrong", error);
            throw error;
        }
    }

    //read order by id
    public async getOrderById(orderId: string) {
        try {
            return await Order.findById(orderId);
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    //read all orders
    public async getAllOrders() {
        try {
            return await Order.find();
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    //update order by id
    public async updateOrderById(orderId: string, updateData: Partial<IOrder>) {
        try {
            console.log("Updating order with ID:", orderId, "with data:", updateData);
            return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
    }

    //delete order by id
    public async deleteOrderById(orderId: string) {
        try {
            console.log("Deleting order with ID:", orderId);
            return await Order.findByIdAndDelete(orderId);
        } catch (error) {
            console.log("Error", error);
            throw error;
        }
} 
}

// model => dao => service => controller => routes