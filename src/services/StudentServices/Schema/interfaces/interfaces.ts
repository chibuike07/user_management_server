import { Response } from "express";
import { AnyObject } from "mongoose";
import { ICustomRequest } from "../../../../Interfaces/authentication";

export interface IAddStudent {
  studentInput: {
    name: string;
    surname: string;
    nin: number;
    dob: string;
    number: string;
  };

  loginStudentInput: {
    nin: number;
    name: string;
    surname: string;
  };
}

export interface IUpdateStudent {
  id: string;
  updateStudent: {
    number: string;
    name: string;
    surname: string;
    dob: string;
  };
}

export interface IStudentServiceContext {
  res: Response;
  req: ICustomRequest;
  datasource: {
    StudentServicesDatasources: {
      getStudents: () => unknown[];
      getStudent: (req: AnyObject) => AnyObject;
      addStudent: (data: IAddStudent["studentInput"]) => AnyObject;
      loginStudent: (
        data: IAddStudent["loginStudentInput"],
        res: unknown
      ) => string;
      updateStudent: (req: AnyObject, data: IUpdateStudent) => string;
    };
  };
}
