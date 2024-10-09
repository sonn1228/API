import { Response } from "express";

const successResponse = (
  res: Response,
  status: number,
  message: string,
  data: object,
  options = {}
) => {
  const response = {
    status,
    message,
    data,
    ...options,
  };
  return res.status(status).json(response);
};

const errorResponse = (res: Response, status: number, message: string) => {
  const response = {
    status,
    message,
  };
  return res.status(status).json(response);
};

export { successResponse, errorResponse };
