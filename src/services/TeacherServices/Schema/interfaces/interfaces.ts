import { Response } from "express";
import { AnyObject } from "mongoose";
import { ICustomRequest } from "../../../../Interfaces/authentication";
import { TitleEnum } from "../../../../util/util";

export interface IAddTeacher {
<<<<<<< HEAD
  teacherInput: {
=======
  TeacherInput: {
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
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
<<<<<<< HEAD
      addTeacher: (data: IAddTeacher["teacherInput"]) => AnyObject;
=======
      addTeacher: (data: IAddTeacher["TeacherInput"]) => AnyObject;
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
      loginTeacher: (
        data: IAddTeacher["loginTeacherInput"],
        res: unknown
      ) => string;
    };
  };
}
