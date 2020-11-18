import { Request, Response, NextFunction } from "express";
import SkillsModel from "../models/skills.model";

const isSkillMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const skill = await SkillsModel.findOne({ name });

  if (skill) {
    res.sendStatus(409);
  } else {
    next();
  }
};

export default isSkillMiddleware;
