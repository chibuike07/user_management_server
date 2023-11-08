import { gql } from "apollo-server-express";

export const TeacherServicesTypes = gql`
  type Teacher {
    _id: ID
    name: String
    surname: String
    role: String
    code: String
    salary: String
    title: String
    createdAt: DateTime
    updatedAt: DateTime
  }

<<<<<<< HEAD
  input TeacherInput {
    name: String
    surname: String
    nin: Int
    salary: Int
    title: String
    dob: String
    number: String
=======
  input TeahcerInput {
    name: String
    surname: String
    role: String
    code: String
    salary: String
    title: String
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
  }

  input TeacherLoginInput {
    nin: Int
    name: String
    code: String
  }

  type addTeacherResponse {
    message: String
  }

  type Query {
    getTeachers: [Teacher!]!
    getTeacher: Teacher!
  }

  type Mutation {
<<<<<<< HEAD
    addTeacher(teacherInput: TeacherInput): addTeacherResponse!
=======
    addTeacher(TeacherInput: TeacherLoginInput): addTeacherResponse!
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
    loginTeacher(loginTeacherInput: TeacherLoginInput): String!
  }
`;
