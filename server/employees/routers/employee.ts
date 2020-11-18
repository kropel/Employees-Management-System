import express, { Request, Response, NextFunction } from "express";
import EmployeeModel, {
  IEmployee,
  IEmployeeSkills,
  ISkills,
} from "../models/employee.model";

import mongoose, { Schema, Document } from "mongoose";

import isEmployeeMiddleware from "../middlewares/isEmployee";
import isToken from "../middlewares/isToken";

const router = express.Router();

router.get(
  "/employees",
  isToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1 } = req.query;
      const limit = 5;

      const employees = await EmployeeModel.find()
        .populate({
          path: "skills",
          populate: {
            path: "skill",
            select: "_id name category weight",
          },
        })
        .limit(limit)
        .skip((+page - 1) * limit)
        .sort({ startWorkDate: -1 });

      const count = await EmployeeModel.countDocuments();

      res.send({
        employees,
        count,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/employees/all",
  isToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await EmployeeModel.find().populate({
        path: "skills",
        populate: {
          path: "skill",
          select: "_id name category weight",
        },
      });

      res.send(employees);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/employees/:id",
  isToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await EmployeeModel.findById(id);
      res.send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/employees",
  isToken,
  isEmployeeMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee: IEmployee = req.body;
      const newEmployee = new EmployeeModel({ ...employee });
      const response = await newEmployee.save();
      res.status(201).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/employees/:id",
  isToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await EmployeeModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/employees/:employeeId/skill/:skillObjectId",
  isToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId, skillObjectId } = req.params;
    const {
      skill,
      level,
    }: { skill: mongoose.Schema.Types.ObjectId; level: number } = req.body;

    const isSkillObjectId = skillObjectId === "undefined" ? false : true;

    try {
      let response;

      if (isSkillObjectId) {
        response = await EmployeeModel.updateOne(
          { _id: employeeId, "skills._id": skillObjectId },
          { $set: { "skills.$.level": level } }
        );
      } else {
        response = await EmployeeModel.updateOne(
          { _id: employeeId },
          { $push: { skills: { skill, level } } }
        );
      }

      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/employees/:id",
  isToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const response = await EmployeeModel.findByIdAndDelete(id);
      res.status(200).send(response);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
