import { ISkillsDTO, ESkills, ISort } from "../models/ISkills";

import { http } from "./httpSvc";

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const getAllSkills = async (page?: number, sortBy?: ISort) => {
  let url = "";

  if (page) {
    url = url.concat(`page=${page}&`);
  }

  if (sortBy) {
    let { order, columnKey } = sortBy;
    order = order === "ascend" ? "asc" : "desc";
    url = url.concat(`columnKey=${columnKey}&order=${order}&`);
  }

  try {
    const { data } = await http.get(`${SERVER_URL}/skills/?${url}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getSkill = async (id: string) => {
  try {
    const { data } = await http.get(`${SERVER_URL}/skills/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export const addSkill = async (skill: ISkillsDTO) => {
  try {
    const { data } = await http.post(`${SERVER_URL}/skills`, skill);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSkill = async (id: string) => {
  try {
    const { data } = await http.delete(`${SERVER_URL}/skills/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSkill = async (id: string, employee: ISkillsDTO) => {
  try {
    const { data } = await http.patch(`${SERVER_URL}/skills/${id}`, employee);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = (skills: ISkillsDTO[]): string[] => {
  let categories = skills.reduce<string[]>((previous, current) => {
    previous.push(current.category);
    return previous;
  }, []);
  return Array.from(new Set<string>(categories));
};
export interface IConfigFormDate {
  weights: number[];
  categories: string[];
}
export const getConfigFormData = async () => {
  const { skills } = await getAllSkills();

  const config = {
    categories: getCategories(skills),
    weights: Object.values(ESkills).filter((elem) =>
      Number.isInteger(Number(elem))
    ) as number[],
  };
  return config;
};
