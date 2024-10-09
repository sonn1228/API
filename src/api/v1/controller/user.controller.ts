// Import libraries
import { Request, Response } from "express";
import bcrypt from "bcrypt";

// Import files
import UserModel from "../../../model/user.model";
import { successResponse, errorResponse } from "../../../helper/response";

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      // Destructure query parameters
      const { sort, order, status, q, page = 1, limit = 10 } = req.query;
      const sortObj: any = {};
      const filter: any = {};

      // Convert page and limit to numbers
      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      // Filter by status
      if (status === "true" || status === "false") {
        filter.status = status === "true";
      }

      // Filter by search query
      if (q) {
        filter.name = { $regex: q, $options: "i" }; // Case-insensitive search by name
      }

      // Set up sorting
      if (sort && order) {
        sortObj[sort as string] = order === "asc" ? 1 : -1; // Sort direction
      } else {
        sortObj._id = -1; // Default sort by _id in descending order
      }

      // Count total users matching the filter
      const totalUsers = await UserModel.countDocuments(filter);

      // Fetch users with filtering, sorting, and pagination
      const users = await UserModel.find(filter)
        .select("-password")
        .sort(sortObj)
        .skip((pageNumber - 1) * limitNumber) // Skip the previous pages
        .limit(limitNumber); // Limit the number of documents returned

      // Return response with user data and count
      successResponse(res, 200, "Success", { count: totalUsers, users });
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Server Error");
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await UserModel.findById(id).select("-password"); // Fetch user by ID and exclude password
      if (!user) {
        errorResponse(res, 404, "User not found");
        return;
      }
      successResponse(res, 200, "Success", user);
    } catch (error) {
      console.error(error);
      errorResponse(res, 404, "Error fetching user");
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, username, password, email } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        username,
        password: hashedPassword,
        email,
      });

      // Save the new user to the database
      const savedUser = await newUser.save(); // Save and get the saved user
      successResponse(res, 201, "User created", savedUser); // Return success response
    } catch (error) {
      console.error(error); // Log the error for debugging
      errorResponse(res, 500, "Error creating user"); // Return error response
    }
  }
  async updateUser(req: Request, res: Response): Promise<void> {
    const { method } = req;
    const userId: string = req.params.id;

    try {
      let updatedUserData: Partial<{
        name: string | null;
        username: string | null;
        email: string | null;
      }>;

      if (method === "PUT") {
        updatedUserData = {
          name: req.body.name || null,
          username: req.body.username || null,
          email: req.body.email || null,
        };
      } else {
        updatedUserData = req.body;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updatedUserData,
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      // Return the success response with the updated user
      successResponse(res, 200, "User updated successfully", updatedUser);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      errorResponse(res, 500, "Error updating user");
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      const user = await UserModel.findByIdAndDelete(userId); // Delete user
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      successResponse(res, 200, "User deleted", { id: userId });
    } catch (error) {
      console.error(error);
      errorResponse(res, 500, "Error deleting user");
    }
  }
}

export default new UserController();
