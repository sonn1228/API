import { v4 as uuidv4 } from "uuid";
// src/models/todo.ts
import { Schema, model, Document } from "mongoose";

// Định nghĩa kiểu Todo với các trường mở rộng
export interface Todo extends Document {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

// Tạo schema cho Todo
const TodoSchema = new Schema<Todo>({
  userId: {
    type: String,
    default: uuidv4(),
  },
  id: {
    type: String,
    default: uuidv4(),
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
