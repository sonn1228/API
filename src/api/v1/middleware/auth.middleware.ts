import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../../utils/jwt";
import { errorResponse } from "../../../helper/response";
import UserModel from "../../../model/user.model";
import Blacklist from "../../../model/blacklist.model";

class AuthMiddleware {
  requiredAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      errorResponse(res, 401, "Token not provided");
      return;
    }

    try {
      const blacklist = await Blacklist.findOne({
        token: accessToken,
      });
      if (blacklist) {
        errorResponse(res, 500, "Unauthorized");
        return;
      }
      const decoded = verifyToken(accessToken);
      if (!decoded) {
        errorResponse(res, 401, "Invalid token");
        return;
      }

      const userId = decoded.userId;
      const exp = decoded.exp;
      const user = await UserModel.findOne({ _id: userId });

      if (!user) {
        errorResponse(res, 401, "Unauthorized");
        return;
      }

      (req as any).user = {
        ...user.toObject(),
        exp,
        accessToken,
      };

      next();
    } catch (error) {
      console.error("Error in AuthMiddleware:", error);
      errorResponse(res, 401, "Authorization error");
      return;
    }
  };
}

export default new AuthMiddleware();
