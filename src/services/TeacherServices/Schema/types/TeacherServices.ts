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

  input TeahcerInput {
    name: String
    surname: String
    role: String
    code: String
    salary: String
    title: String
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
    addTeacher(TeacherInput: TeacherLoginInput): addTeacherResponse!
    loginTeacher(loginTeacherInput: TeacherLoginInput): String!
  }
`;
