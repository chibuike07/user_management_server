import { Response } from "express";
import { AnyObject } from "mongoose";
import { ICustomRequest } from "../../../../Interfaces/authentication";
import { TitleEnum } from "../../../../util/util";

export interface IAddTeacher {
  teacherInput: {
    nin: string;
    title: TitleEnum;
    name: string;
    surname: string;
    number: number;
    salary: number;
    dob: string;
  };

  loginTeacherInput: {
    name: string;
    surname: string;
    code: string;
    nin: number;
  };
}

export interface ITeacherServiceContext {
  res: Response;
  req: ICustomRequest;
  datasource: {
    TeacherServicesDatasources: {
      getTeachers: () => unknown[];
      getTeacher: (req: AnyObject) => AnyObject;
      addTeacher: (data: IAddTeacher["teacherInput"]) => AnyObject;
      loginTeacher: (
        data: IAddTeacher["loginTeacherInput"],
        res: unknown
      ) => string;
    };
  };
}
