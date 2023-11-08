import mongoose from "mongoose";
export interface IStudentDocument extends mongoose.Document {
  code: string;
}
export interface ITeacherDocument extends mongoose.Document {
  title: string;
  salary: string;
  code: string;
}

export interface ICoreUsersDocument extends mongoose.Document {
  name: string;
  surname: string;
  dob: string;
  number: string;
  nin: number;
  role: string;
}
