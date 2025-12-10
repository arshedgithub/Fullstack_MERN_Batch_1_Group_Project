import { Schema, model, Document, Types } from "mongoose";

export interface IProduct extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    isAvailable: boolean;
    status?: "in stock" | "out of stock";
    createdBy: Types.ObjectId;
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
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    },
    { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
