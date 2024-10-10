import { Router } from "express";
import AuthController from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

// POST to sign up a new user
router.post("/signup", AuthController.signup);

// POST to log in an existing user
router.post("/login", AuthController.login);

// POST to log out the user
router.post("/logout", authMiddleware.requiredAuth, AuthController.logout);

// GET to retrieve the currently logged-in user's details
router.get("/profile", authMiddleware.requiredAuth, AuthController.profile);

export default router;
