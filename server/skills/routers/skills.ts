import express, { Request, Response, NextFunction } from "express";
import SkillsModel, { ISkills } from "../models/skills.model";
import isSkillMiddleware from "../middlewares/isSkill";

export interface IGetSkills {
  page?: number;
  sort?: string;
  order?: number;
}

const router = express.Router();

router.get(
  "/skills",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let skills: ISkills[];

      if (req.query.page || req.query.tag || req.query.direction) {
        const { page = 1, sort = "_id", order = -1 }: IGetSkills = req.query;

        const limit = 5;
        skills = await SkillsModel.find()
          .limit(limit)
          .skip((+page - 1) * limit)
          .sort({ [sort]: order });
      } else {
        skills = await SkillsModel.find();
      }
      const count = await SkillsModel.countDocuments();
      res.send({ skills, count });
    } catch (e) {
      next(e);
    }
  }
);
router.get(
  "/skills/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await SkillsModel.findById(id);
      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);
router.post(
  "/skills",
  isSkillMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const skill: ISkills = req.body;
      const newSkill = new SkillsModel({ ...skill });
      const response = await newSkill.save();
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  }
);
router.patch(
  "/skills/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await SkillsModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);
router.delete(
  "/skills/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await SkillsModel.findByIdAndDelete(id);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);
export default router;
