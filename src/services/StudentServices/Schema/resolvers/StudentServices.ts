import { IStudentDocument } from "../../../../Interfaces/model";
import { userVerifyToken } from "../../../../middlewares/authorization/userVerifyToken";
import { Role } from "../../../../util/util";
import {
  IAddStudent,
  IUpdateStudent,
  IStudentServiceContext,
} from "../interfaces/interfaces";
import { AuthenticationError } from "apollo-server-express";

export const StudentQueryResolvers = {
  getStudents: async (
    _: null,
    args: IStudentDocument,
    { datasource, req }: IStudentServiceContext
  ) => {
    const { StudentServicesDatasources } = datasource;
    await userVerifyToken({ req, roles: Role[0] });
    if (!req.user)
      return new AuthenticationError("Access denied, kindly login");

    const result = StudentServicesDatasources.getStudents();
    return result;
  },

  getStudent: async (
    _: null,
    args: IStudentDocument,
    { datasource, req }: IStudentServiceContext
  ) => {
    const { StudentServicesDatasources } = datasource;
    await userVerifyToken({ req, roles: Role[0] });
    if (!req.user)
      return new AuthenticationError("Access denied, kindly login");
    return StudentServicesDatasources.getStudent({ req });
  },
};

export const StudentMutationResolvers = {
  addStudent: async (
    _: null,
    { studentInput }: IAddStudent,
    { datasource }: IStudentServiceContext
  ) => {
    const { StudentServicesDatasources } = datasource;
    return StudentServicesDatasources.addStudent(studentInput);
  },

  loginStudent: async (
    _: null,
    { loginStudentInput }: IAddStudent,
    { datasource, res }: IStudentServiceContext
  ) => {
    const { StudentServicesDatasources: UserServicesDatasources } = datasource;
    return UserServicesDatasources.loginStudent(loginStudentInput, { res });
  },
  updateStudent: async (
    _: null,
    { id, updateStudent: updateUser }: IUpdateStudent,
    { datasource, req }: IStudentServiceContext
  ) => {
    await userVerifyToken({ req, roles: Role[0] });
    const { StudentServicesDatasources: UserServicesDatasources } = datasource;
    return UserServicesDatasources.updateStudent(req, {
      id,
      updateStudent: updateUser,
    });
  },
};
