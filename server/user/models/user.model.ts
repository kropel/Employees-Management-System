import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String },
  password: { type: String },
});

export default mongoose.model<IUser>("user", UserSchema);
