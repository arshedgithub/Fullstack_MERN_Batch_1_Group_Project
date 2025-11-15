import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    status?: "in stock" | "out of stock";
    createdBy: string;
}

const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
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

export default model<IProduct>("Product", productSchema);
