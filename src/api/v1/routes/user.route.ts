import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// GET all users
router.get("/", authMiddleware.requiredAuth, UserController.getAllUsers);

// GET a single user by ID
router.get("/:id", UserController.getUserById);

// POST to create a new user
router.post("/", UserController.createUser);

// PUT to update a user by ID
router.put("/:id", UserController.updateUser);

// PATCH to update a user by ID
router.patch("/:id", UserController.updateUser);

// DELETE to remove a user by ID
router.delete("/:id", UserController.deleteUser);

export default router;
