import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Đảm bảo email là duy nhất
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Mặc định là thời gian hiện tại
  },
});

// Tạo model từ schema
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
