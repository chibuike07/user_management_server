import { UserInputError, ValidationError } from "apollo-server-express";
import { userGenerateToken } from "../../../../middlewares/authorization/UserGenerateToken";
import { IAddTeacher, ITeacherServiceContext } from "../interfaces/interfaces";
import { IResolveRequest } from "../../../../Interfaces/authentication";
import { Role } from "../../../../util/util";
import { AnyObject, Document, Types } from "mongoose";
import { IStudentDocument } from "../../../../Interfaces/model";
import { Teacher } from "../../../../model/teacher";

export const TeacherServicesDatasources = {
  addTeacher: async (
    data: IAddTeacher["TeacherInput"]
  ): Promise<
    | Error
    | ValidationError
    | {
        message: string;
      }
  > => {
    const { nin, surname, name, dob, number, salary, title } = data;
    const findTeacher = await Teacher.findOne({ nin });
    if (findTeacher) throw new UserInputError("Teacher already exists");

    const randomString = "a2b1c5d4e7j3"
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
    console.log("randomString", randomString);

    try {
      await Teacher.create({
        surname,
        name,
        code: `${name.substring(0, 3)}_${randomString.substring(0, 3)}`,
        role: Role[2],
        dob,
        number,
        salary,
        title,
      });

      return { message: "teacher created successfully" };
    } catch (error: any) {
      return new Error(error.message);
    }
  },

  loginTeacher: async (
    data: IAddTeacher["loginTeacherInput"],
    { res }: ITeacherServiceContext
  ): Promise<string | ValidationError | UserInputError> => {
    const { nin, name, code } = data;
    const findTeacher = await Teacher.findOne({ nin, name, code });

    if (!findTeacher) return new UserInputError("Form field(s) incorrect");

    return userGenerateToken(res, findTeacher?._id, Role[1]);
  },

  getTeachers: async (): Promise<
    | Error
    | (Document<unknown, AnyObject, IStudentDocument> &
        IStudentDocument & {
          _id: Types.ObjectId;
        })[]
  > => {
    const findTeachers = await Teacher.find({}).sort({ createdAt: -1 });
    if (findTeachers.length < 1) return new Error("No Teacher found");

    return findTeachers;
  },

  getTeacher: async ({
    req,
  }: ITeacherServiceContext): Promise<
    | (Document<unknown, AnyObject, IStudentDocument> &
        IStudentDocument & {
          _id: Types.ObjectId;
        })
    | Error
  > => {
    const user = (req as IResolveRequest).user;
    const findTeacher = await Teacher.findById({ _id: user.id }).sort({
      createdAt: -1,
    });

    if (!findTeacher) return new Error("No user found");
    return findTeacher;
  },
};
