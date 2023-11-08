import { ITeacherDocument } from "../../../../Interfaces/model";
import { userVerifyToken } from "../../../../middlewares/authorization/userVerifyToken";
import { IAddTeacher, ITeacherServiceContext } from "../interfaces/interfaces";
import { AuthenticationError } from "apollo-server-express";

export const TeacherQueryResolvers = {
  getTeachers: async (
    _: null,
    args: ITeacherDocument,
    { datasource, req }: ITeacherServiceContext
  ) => {
    const { TeacherServicesDatasources } = datasource;
    await userVerifyToken({ req, roles: "" });
    if (!req.user)
      return new AuthenticationError("Access denied, kindly login");

    const result = TeacherServicesDatasources.getTeachers();
    return result;
  },

  getTeacher: async (
    _: null,
    args: ITeacherDocument,
    { datasource, req }: ITeacherServiceContext
  ) => {
    const { TeacherServicesDatasources } = datasource;
    await userVerifyToken({ req, roles: "" });
    if (!req.user)
      return new AuthenticationError("Access denied, kindly login");
    return TeacherServicesDatasources.getTeacher({ req });
  },
};

export const TeacherMutationResolvers = {
  addTeacher: async (
    _: null,
    { TeacherInput: executiveInput }: IAddTeacher,
    { datasource }: ITeacherServiceContext
  ) => {
    const { TeacherServicesDatasources: ExecutiveServicesDatasources } =
      datasource;
    return ExecutiveServicesDatasources.addTeacher(executiveInput);
  },

  loginTeacher: async (
    _: null,
    { loginTeacherInput: loginUserInput }: IAddTeacher,
    { datasource, res }: ITeacherServiceContext
  ) => {
    const { TeacherServicesDatasources } = datasource;
    return TeacherServicesDatasources.loginTeacher(loginUserInput, { res });
  },
};
