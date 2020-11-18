export enum ELevels {
  TRAINEE,
  JUNIOR,
  MID,
  SENIOR,
  NOT_DEFINED,
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

export enum EPositions {
  SOFTWARE_DEVELOPER,
  QA,
  PROJECT_MANAGER,
  NOT_DEFINED,
}

export interface IObject {
  [key: string]: string | string[] | number;
}

export interface IEmployee {
  _id: string;
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

export interface IGetEmployees {
  employees: IEmployee[];
  count: number;
}

export type IEmployeeDTO = Omit<IEmployee, '_id'>;

export interface ISkills {
  _id: string;
  name: string;
  category: string;
  weight: ESkills;
}

export type ISkillsDTO = Omit<ISkills, '_id'>;

export interface IEmployeeSkills {
  _id: string;
  skill: ISkills;
  level: number;
}

export type IEmployeeSkillsDTO = Omit<IEmployeeSkills, '_id'>;

export interface IEmployeeForm {
  name: string;
  surname: string;
  startWorkDate: string | moment.Moment;
  evaluationDate: string | moment.Moment;
  tags?: string[];
  level: any;
  position: any;
  photo: string;
  project?: string;
}
