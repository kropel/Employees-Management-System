import { Request, Response, NextFunction } from "express";

const isTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default isTokenMiddleware;
