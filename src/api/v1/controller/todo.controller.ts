import { Request, RequestHandler, Response } from "express";
import { TodoModel } from "../../../model/todo.model";
import { successResponse, errorResponse } from "../../../helper/response";

class TodoController {
  getTodos: RequestHandler = async (req: Request, res: Response) => {
    try {
      const todoList = await TodoModel.find();
      successResponse(res, 200, "success", { todoList });
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
    }
  };

  deleteTodoById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const deletedTodo = await TodoModel.findByIdAndDelete(id);
      console.log("deletedTodo: ", deletedTodo);
      if (deletedTodo) {
        successResponse(res, 200, "Todo deleted successfully", { deletedTodo });
      } else {
        errorResponse(res, 404, "Todo not found");
      }
    } catch (error) {
      errorResponse(res, 500, "Internal server error");
    }
  };
  test: RequestHandler = async (req: Request, res: Response) => {
    res.send("<h1>Hello world</h1>");
  };
  createTodo: RequestHandler = async (req: Request, res: Response) => {
    try {
      const todo = req.body;
      const newTodo = new TodoModel({
        ...todo,
      });
      await newTodo.save();
      successResponse(res, 200, "Todo created successfully", todo);
    } catch (error) {
      errorResponse(res, 400, "Todos created Error");
    }
  };
}

export default new TodoController();
