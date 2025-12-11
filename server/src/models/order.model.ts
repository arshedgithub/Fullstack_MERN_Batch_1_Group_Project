import { Schema, model, Document, Types } from "mongoose";

export interface IOrderItem {
    productId: Types.ObjectId;
    product: string;
    size: "small" | "medium" | "large" ;
    quantity: number;
    price: number;
    toppings?: string[];
    specialInstructions?: string;
}

export interface IOrder extends Document {
    _id: Types.ObjectId;
    orderNumber: string;
    customerId: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    orderStatus: "pending" | "preparing" | "ready" | "cancelled";
    paymentMethod: "cash" | "card" | "online";
    createdAt: Date;
}

const orderSchema = new Schema<IOrder>(
    {
        orderNumber: {
            type: String,
            required: true,
            unique: true
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            product: {
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
        totalAmount: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            enum: ["pending", "preparing", "ready", "cancelled"],
            default: "pending"
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "online"],
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }
);

export default model<IOrder>("Order", orderSchema);
