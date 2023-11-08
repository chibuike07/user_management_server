import { gql } from "apollo-server-express";

export const StudentServicesTypes = gql`
  type Student {
    name: String
    surname: String
    dob: String
    number: String
    nin: Int
    createdAt: DateTime
    updatedAt: DateTime
  }

  input StudentInput {
    nin: Int
    name: String
    surname: String
    dob: String
    number: String
  }

  input UpdateStudentInput {
    name: String
    surname: String
    dob: String
    number: String
    salary: String
  }

  input StudentLoginInput {
    name: String
    surname: String
    nin: Int
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
