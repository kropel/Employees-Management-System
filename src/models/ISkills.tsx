export enum ESortSkills {
  NAME,
  CATEGORY,
  WEIGHT,
}

export enum ESkillLevel {
  NOT_ACQUIRED,
  BASIC,
  INTERMEDIATE,
  ADVANCED,
  EXPERT,
}

export interface ISort {
  order?: string;
  columnKey?: string;
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

export interface IGetSkills {
  skills: ISkills[];
  count: number;
}

export interface ISkills {
  _id: string;
  name: string;
  category: string;
  weight: ESkills;
}

export type ISkillsDTO = Omit<ISkills, '_id'>;
