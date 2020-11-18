import {
  IEmployeeDTO,
  ELevels,
  EPositions,
  IEmployeeSkills,
  ISkills,
} from '../models/IEmployee';

import { http } from '../services/httpSvc';

const SERVER_URL = process.env.REACT_APP_URL_SERVER;

export const getAllEmployees = async () => {
  try {
    const { data } = await http.get(`${SERVER_URL}/employees/all`);

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getPaginatedEmployees = async (page: number) => {
  try {
    const { data } = await http.get(`${SERVER_URL}/employees/?page=${page}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getEmployee = async (id: string) => {
  try {
    const { data } = await http.get(`${SERVER_URL}/employees/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addEmployee = async (employee: IEmployeeDTO) => {
  try {
    const { data } = await http.post(`${SERVER_URL}/employees`, employee);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (id: string, employee: IEmployeeDTO) => {
  try {
    const { data } = await http.patch(
      `${SERVER_URL}/employees/${id}`,
      employee
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployeeSkill = async (
  employeeId: string,
  skill: ISkills,
  level: number,
  skillObject?: IEmployeeSkills
) => {
  try {
    const {
      data,
    } = await http.patch(
      `${SERVER_URL}/employees/${employeeId}/skill/${skillObject?._id}`,
      { skill, level }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const { data } = await http.delete(`${SERVER_URL}/employees/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const levelsValues: { [key: number]: string } = {
  [ELevels.JUNIOR]: 'Junior',
  [ELevels.MID]: 'Mid',
  [ELevels.SENIOR]: 'Senior',
  [ELevels.TRAINEE]: 'Trainee',
};

export const levelsMap = (param: number) => {
  return {
    value: levelsValues[param],
    key: param,
  };
};

export const positionsValues: { [key: number]: string } = {
  [EPositions.PROJECT_MANAGER]: 'Project Manager',
  [EPositions.QA]: 'QA',
  [EPositions.SOFTWARE_DEVELOPER]: 'Software Developer',
};

export const positionsMap = (param: EPositions) => {
  return {
    value: positionsValues[param],
    key: param,
  };
};
