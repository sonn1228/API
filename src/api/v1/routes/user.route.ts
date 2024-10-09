import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();

// GET all users
router.get("/users", UserController.getAllUsers);

// GET a single user by ID
router.get("/users/:id", UserController.getUserById);

// POST to create a new user
router.post("/users", UserController.createUser);

// PUT to update a user by ID
router.put("/users/:id", UserController.updateUser);

// PATCH to update a user by ID
router.patch("/users/:id", UserController.updateUser);

// DELETE to remove a user by ID
router.delete("/users/:id", UserController.deleteUser);

export default router;
