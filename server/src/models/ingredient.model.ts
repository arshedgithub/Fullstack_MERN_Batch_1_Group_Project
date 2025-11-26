import { Schema, model, Document } from "mongoose";

export interface IIngredient extends Document {
    _id:String;
    name:String;
    ingredient_type:"vegetable" | "meat" |"cheese" |"sauce" | "other";
    price: number;
    isAvailable: boolean;
}

const ingredientSchema  = new Schema<IIngredient>(
    {
        name : { 
            type: String,
            required: true,
            unique: true
        },
        ingredient_type: {
            type: String,
            enum:["vegetable","meat","cheese","other"],
            default:"other"
        },
        price: {
            type: Number,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
export default model<IIngredient>("User", ingredientSchema);