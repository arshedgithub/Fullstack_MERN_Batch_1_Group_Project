import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  authId: string;
  username: string;
  email?: string;
  role: "user" | "admin";
  userStatus: "active" | "inactive" | "suspended";
}

const userSchema = new Schema<IUser>(
  {
    authId: {
      type: String,
      required: true,
      unique: true
    },
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
