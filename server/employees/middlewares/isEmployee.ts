import { Request, Response, NextFunction } from "express";
import EmployeeModel from "../models/employee.model";

const isEmployeeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, surname } = req.body;
  const employee = await EmployeeModel.findOne({ name, surname });

  if (employee) {
    res.sendStatus(409);
  } else {
    next();
  }
};

export default isEmployeeMiddleware;
