import {
  StudentMutationResolvers,
  StudentQueryResolvers,
} from "./services/StudentServices/Schema/resolvers/StudentServices";

import {
  TeacherMutationResolvers,
  TeacherQueryResolvers,
} from "./services/TeacherServices/Schema/resolvers/TeacherServices";

export const Mutation = {
  ...StudentMutationResolvers,
  ...TeacherMutationResolvers,
};

export const Query = {
  ...StudentQueryResolvers,
  ...TeacherQueryResolvers,
};
