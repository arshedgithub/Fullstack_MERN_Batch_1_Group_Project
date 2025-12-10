import { Schema, model, Document, ObjectId, Types } from "mongoose";

export interface IOrder extends Document {
    _id: Types.ObjectId;
    items: Array<{
        productId: string;
        name: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    customer: string;
    isAvailable: boolean;
    status?: "pending" | "processing" | "completed" | "delivered";
    createdBy?: string;
}

const orderSchema = new Schema<IOrder>(
    {
        items: Array<{
            productId: string, 
            name: string,
            quantity: number,
            price: number
        }>,
        totalAmount: {
            type: Number,
        },
        customer: {
            type: String,
            ref: 'User',
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        status: {
            type: String,
            enum: ["pending", "processing", "completed", "delivered"],
            default: "pending"
        },
        createdBy: {
            type: String,
            ref: 'User',
            required: false
        }
    },
    { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
