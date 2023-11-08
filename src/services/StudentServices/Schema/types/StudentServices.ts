import { gql } from "apollo-server-express";

export const StudentServicesTypes = gql`
  type Student {
    name: String
    surname: String
    dob: String
    number: Int
    nin: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  input StudentInput {
    nin: String
    name: String
    surname: String
    dob: String
    number: Int
  }

  input UpdateStudentInput {
    name: String
    surname: String
    dob: String
    number: Int
  }

  input StudentLoginInput {
    name: String
    surname: String
    nin: String
  }

  type addStudentResponse {
    message: String
  }

  type Query {
    getStudents: [Student!]!
    getStudent: Student!
  }

  type Mutation {
    addStudent(studentInput: StudentInput): addStudentResponse!
    updateStudent(
      id: ID
      updateStudent: UpdateStudentInput
    ): addStudentResponse!
    loginStudent(loginStudentInput: StudentLoginInput): String!
  }
`;
