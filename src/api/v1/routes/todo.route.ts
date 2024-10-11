// src/routes/todoRoutes.ts
import express from "express";
import todoController from "../controller/todo.controller";

const router = express.Router();

router.get("/", todoController.getTodos);
// router.post('/', todoController.createTodo);
// router.put('/:id', todoController.updateTodoById);
// router.delete('/:id', todoController.deleteTodoById);

export default router;
