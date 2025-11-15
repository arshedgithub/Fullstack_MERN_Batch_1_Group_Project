import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  phone: string;
  address: string;
  email?: string;
  password: string;
  role: "user" | "admin";
  userStatus: "active" | "inactive" | "suspended";
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    phone:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    userStatus: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
