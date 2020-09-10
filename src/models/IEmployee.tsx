export enum ELevels {
  JUNIOR = "Junior",
  MID = "Mid",
  SENIOR = "Senior",
  NOT_DEFINED = "Not defined",
}
export enum EPositions {
  SOFTWARE_DEVELOPER = "Software Developer",
  QA = "QA",
  PROJECT_MANAGER = "Project Manager",
  NOT_DEFINED = "Not defined",
}

export interface IEmployee {
  id?: string;
  name: string;
  surname: string;
  startWorkDate: string;
  evaluationDate: string;
  tags?: string[];
  level: ELevels;
  position: EPositions;
  photo?: string;
  project?: string;
}

export interface IEmployeeDTO {
  id?: string;
  name: string;
  surname: string;
  startWorkDate: moment.Moment | null;
  evaluationDate: moment.Moment | null;
  tags?: string[];
  level: ELevels | null;
  position: EPositions | null;
  photo?: string;
  project?: string;
}