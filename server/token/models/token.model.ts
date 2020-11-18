import mongoose, { Schema, Document } from "mongoose";

export interface IToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  password: string;
}

const UserSchema: Schema = new Schema({
  userId: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
  token: { type: String },
});

export default mongoose.model<IToken>("token", UserSchema);
