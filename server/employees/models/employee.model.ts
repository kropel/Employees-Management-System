import mongoose, { Schema, Document } from "mongoose";

export interface ISkills {
  _id: string;
  name: string;
  category: string;
  weight: ESkills;
}

export enum ESkills {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
}

export enum ELevels {
  TRAINEE,
  JUNIOR,
  MID,
  SENIOR,
  NOT_DEFINED,
}

export enum EPositions {
  SOFTWARE_DEVELOPER,
  QA,
  PROJECT_MANAGER,
  NOT_DEFINED,
}

export interface IEmployeeSkills {
  skill: mongoose.Schema.Types.ObjectId;
  level: number;
}

export interface IEmployee extends Document {
  name: string;
  surname: string;
  startWorkDate: string;
  evaluationDate: string;
  tags?: string[];
  level: ELevels;
  position: EPositions;
  photo: string;
  project?: string;
  skills?: IEmployeeSkills[];
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  startWorkDate: { type: String, required: true },
  evaluationDate: { type: String, required: true },
  tags: [{ type: String, required: false }],
  level: { type: ELevels, required: true },
  position: { type: EPositions, required: true },
  photo: { type: String, required: true },
  project: { type: String, required: false },
  skills: [
    {
      skill: {
        ref: "skills",
        type: mongoose.Schema.Types.ObjectId,
      },
      level: { type: Number },
    },
  ],
});

export default mongoose.model<IEmployee>("employees", EmployeeSchema);
