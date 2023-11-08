import { UserInputError, ValidationError } from "apollo-server-express";
import { Student } from "../../../../model/student";
import { userGenerateToken } from "../../../../middlewares/authorization/UserGenerateToken";
import {
  IAddStudent,
  IUpdateStudent,
  IStudentServiceContext,
} from "../interfaces/interfaces";
import { IResolveRequest } from "../../../../Interfaces/authentication";
import { Role } from "../../../../util/util";
import { AnyObject, Document, Types } from "mongoose";
import { IStudentDocument } from "../../../../Interfaces/model";

export const StudentServicesDatasources = {
  addStudent: async (
    data: IAddStudent["studentInput"]
  ): Promise<
    | Error
    | ValidationError
    | {
        message: string;
      }
  > => {
    const { name, surname, dob, nin, number } = data;
    const findStudent = await Student.findOne({ nin });
    if (findStudent) throw new UserInputError("User already exists");

    try {
      await Student.create({
        name,
        surname,
        number,
        dob,
        nin,
      });

      return { message: "Student created successfully" };
    } catch (error: any) {
      return new Error(error.message);
    }
  },

  loginStudent: async (
    data: IAddStudent["loginStudentInput"],
    { res }: IStudentServiceContext
  ): Promise<string | ValidationError | UserInputError> => {
    const { nin, name, surname } = data;
    const findStudent = await Student.findOne({ nin, name, surname });
    if (!findStudent) return new UserInputError("Incorrect input field(s)");

    return userGenerateToken(res, findStudent?._id, Role[0]);
  },

  getStudents: async (): Promise<
    | Error
    | (Document<unknown, AnyObject, IStudentDocument> &
        IStudentDocument & {
          _id: Types.ObjectId;
        })[]
  > => {
    const findStudent = await Student.find({}).sort({ createdAt: -1 });
    if (findStudent.length < 1) return new Error("No Student found");

    return findStudent;
  },

  updateStudent: async (
    req: AnyObject,
    { id, updateStudent }: IUpdateStudent
  ): Promise<
    | Error
    | {
        message: string;
      }
  > => {
<<<<<<< HEAD
    const findStudent = await Student.findByIdAndUpdate(id, updateStudent, {
=======
    const findUsers = await Student.findById(id, updateStudent, {
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
      omitUpdefined: true,
      new: true,
    });

<<<<<<< HEAD
    if (!findStudent) return new Error("No student found");
=======
    if (!findUsers) return new Error("No student found");

>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
    return { message: "Student updated successfully" };
  },

  getStudent: async ({
    req,
  }: IStudentServiceContext): Promise<
    | (Document<unknown, AnyObject, IStudentDocument> &
        IStudentDocument & {
          _id: Types.ObjectId;
        })
    | Error
  > => {
    const user = (req as IResolveRequest).user;
    const findStudent = await Student.findById({ _id: user.id }).sort({
      createdAt: -1,
    });

    if (!findStudent) return new Error("No student found");
    return findStudent;
  },
};
