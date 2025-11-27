import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
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
