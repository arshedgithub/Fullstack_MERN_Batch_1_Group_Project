import { Schema, model, Document } from "mongoose";

export interface IAuth extends Document {
  _id: string;
  username: string;
  password: string;
  refreshToken: string;
}

const authSchema = new Schema<IAuth>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default model<IAuth>("Auth", authSchema);
