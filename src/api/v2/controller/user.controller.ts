import { Request, Response } from "express";
import UserModel from "../../../model/user.model";

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const user2 = await UserModel.find();
      console.log(user2);
      const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ];
      res.json({
        status: 200,
        data: users,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      const user = { id: userId, name: "John Doe" }; // Mock user
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "User not found" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const newUser = req.body;
    try {
      res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
      res
        .status(200)
        .json({ message: `User ${userId} updated`, user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      res.status(200).json({ message: `User ${userId} deleted` });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}

export default new UserController();
