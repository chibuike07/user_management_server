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

  input TeacherInput {
    name: String
    surname: String
    nin: Int
    salary: Int
    title: String
    dob: String
    number: String
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
    addTeacher(teacherInput: TeacherInput): addTeacherResponse!
    loginTeacher(loginTeacherInput: TeacherLoginInput): String!
  }
`;
