import { Request, RequestHandler, Response } from "express";
import { TodoModel } from "../../../model/todo.model";
import { successResponse } from "../../../helper/response";

class TodoController {
  getTodos: RequestHandler = async (req: Request, res: Response) => {
    const todoList = await TodoModel.find();
    successResponse(res, 200, "success", {
      todoList,
    });
  };
}

export default new TodoController();
