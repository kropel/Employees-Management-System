import { IEmployee } from "./IEmployee";

export interface IFormState {
  employeeData: IEmployee;
  OPERATION_STATUS: EStatus;
  OPERATION_TYPE: EOperation;
}

export enum EStatus {
  LOADING = "LOADING",
  DONE = "DONE",
  FAILED = "FAILED",
}

export enum EOperation {
  ADD = "ADD",
  GET = "GET",
}
