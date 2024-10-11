// src/models/todo.ts
import { Schema, model, Document } from "mongoose";

// Định nghĩa kiểu Todo với các trường mở rộng
export interface Todo extends Document {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Tạo schema cho Todo
const TodoSchema = new Schema<Todo>({
  userId: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true, // Đảm bảo id là duy nhất
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Tạo model Todo
export const TodoModel = model<Todo>("Todo", TodoSchema);
