import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    status?: "in stock" | "out of stock";
    createdBy: Date;
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
            enum: ["in stock", "out of stock"],
            default: "in stock"
        },
        createdBy: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
