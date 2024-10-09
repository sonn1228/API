import { Express } from "express";

import userRoutes from "./user.route";

const config = {
  v1: "/api/v1",
};

export const routesV1 = (app: Express) => {
  app.use(`${config.v1}`, userRoutes);
};
