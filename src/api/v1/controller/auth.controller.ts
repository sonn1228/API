import { Request, Response, RequestHandler } from "express";
import UserModel from "../../../model/user.model";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../../utils/jwt";
import { errorResponse, successResponse } from "../../../helper/response";
import Blacklist from "../../../model/blacklist.model";

class AuthController {
  signup: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = new UserModel({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error during signup", error });
    }
  };

  login: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { email, password: hash } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "user not found" });
        return;
      }

      if (!bcrypt.compareSync(hash, user.password)) {
        res.status(400).json({ message: "invalid password" });
        return;
      }

      const accessToken = createAccessToken({
        userId: user.id,
      });
      if (!accessToken) {
        errorResponse(res, 500, "Server errors");
        return;
      }
      successResponse(res, 200, "Success", {
        accessToken,
      });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  };
  logout: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const user = (req as any).user; 
    const { accessToken, exp } = user;

    if (!accessToken) {
      res.status(400).json({ message: "Token not provided" });
      return;
    }

    try {
      const blacklist = await Blacklist.findOne({ token: accessToken });
      if (!blacklist) {
        const newBlackList = new Blacklist({
          token: accessToken,
          expiresAt: exp,
        });
        await newBlackList.save();
      }

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  profile: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const user = (req as any).user;
    successResponse(res, 200, "success", user);
  };
}

export default new AuthController();
