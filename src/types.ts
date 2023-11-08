import { gql } from "apollo-server";
import { StudentServicesTypes } from "./services/StudentServices/Schema/types/StudentServices";
import { TeacherServicesTypes } from "./services/TeacherServices/Schema/types/TeacherServices";

const linkSchema = gql`
  scalar JSON
  scalar DateTime
  scalar Date
  scalar Time
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export const typeDefs = [
  linkSchema,
  StudentServicesTypes,
  TeacherServicesTypes,
];
