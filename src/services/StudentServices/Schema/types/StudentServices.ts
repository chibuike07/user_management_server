import { gql } from "apollo-server-express";

export const StudentServicesTypes = gql`
  type Student {
    name: String
    surname: String
    dob: String
<<<<<<< HEAD
    number: String
    nin: Int
=======
    number: Int
    nin: String
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
    createdAt: DateTime
    updatedAt: DateTime
  }

  input StudentInput {
<<<<<<< HEAD
    nin: Int
    name: String
    surname: String
    dob: String
    number: String
=======
    nin: String
    name: String
    surname: String
    dob: String
    number: Int
>>>>>>> e36bcf117096afa6873c92f1223e75afcb18e10c
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
