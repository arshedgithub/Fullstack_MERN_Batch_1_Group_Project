import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
    _id: string;
    items: Array<{
        productId: string,
        name: string,
        quantity: number,
        price: number
    }>;
    totalAmount: number;
    customer: string;
    isAvailable: boolean;
    status?: "in stock" | "out stock";
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
            enum: ["in stock", "out stock"],
            default: "in stock"
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
