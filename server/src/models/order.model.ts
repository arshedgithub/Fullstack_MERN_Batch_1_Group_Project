import { Schema, model, Document } from "mongoose";

export interface IOrderItem {
    productId: string;
    name: string;
    size?: string;
    quantity: number;
    price: number;
    toppings?: string[];
    specialInstructions?: string;
}

export interface IDeliveryAddress {
    street: string;
    city: string;
    zipCode: string;
    phone: string;
}

export interface IOrder extends Document {
    _id: string;
    orderNumber: string;
    customerId: string;
    items: IOrderItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    status: "pending" | "confirmed" | "preparing" | "ready" | "out-for-delivery" | "delivered" | "cancelled";
    paymentMethod: "cash" | "card" | "online";
    paymentStatus: "pending" | "paid" | "refunded";
    deliveryAddress: IDeliveryAddress;
    deliveryInstructions?: string;
    estimatedDeliveryTime?: Date;
    actualDeliveryTime?: Date;
    assignedTo?: string;
}

const orderSchema = new Schema<IOrder>(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true
        },
        customerId: {
            type: String,
            ref: 'User',
            required: true
        },
        items: [{
            productId: {
                type: String,
                ref: 'Product',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            size: String,
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            },
            toppings: [String],
            specialInstructions: String
        }],
        subtotal: {
            type: Number,
            required: true
        },
        tax: {
            type: Number,
            default: 0
        },
        deliveryFee: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "preparing", "ready", "out-for-delivery", "delivered", "cancelled"],
            default: "pending"
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "online"],
            required: true
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "refunded"],
            default: "pending"
        },
        deliveryAddress: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        },
        deliveryInstructions: String,
        estimatedDeliveryTime: Date,
        actualDeliveryTime: Date,
        assignedTo: {
            type: String,
            ref: 'User'
        }
    },
    { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
