import GraphQLJSON from "graphql-type-json";
import { typeDefs } from "./types";
import { Query, Mutation } from "./resolvers";

const resolvers = {
  Query,
  Mutation,
  JSON: GraphQLJSON,
};

export { resolvers, typeDefs };
