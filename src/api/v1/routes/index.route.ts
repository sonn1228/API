import { Express } from "express";
import cors from "cors";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import todoRoutes from "./todo.route";
const config = {
  v1: "/api/v1",
  whiteList: ["http://127.0.0.1:5500", "http://localhost:5173/"],
};

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    const mode = process.env.NODE_ENV || "development";
    if (
      mode === "development" ||
      !origin ||
      config.whiteList.indexOf(origin) !== -1
    ) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

export const routesV1 = (app: Express) => {
  app.use(cors(corsOptions));

  app.use(`${config.v1}/todos`, todoRoutes);
  app.use(`${config.v1}/users`, userRoutes);
  app.use(`${config.v1}/auth`, authRoutes);
};
