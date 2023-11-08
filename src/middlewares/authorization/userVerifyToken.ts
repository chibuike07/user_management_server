import { Request } from "express";
import { AuthenticationError, ValidationError } from "apollo-server";

import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { envConfig } from "../../config/config";
import { ICustomRequest, IVerified } from "../../Interfaces/authentication";
config();

export const userVerifyToken = async ({
  roles,
  req,
}: {
  roles: string | string[] | undefined;
  req: Request;
}): Promise<AuthenticationError | ValidationError | undefined> => {
  if (roles && typeof roles === "string") {
    roles = [roles];
  }

  /* The line `const token = req.cookies[envConfig.USER_TOKEN_KEY];` is retrieving the value of the
`USER_TOKEN_KEY` property from the `envConfig` object and assigning it to the `token` variable. */
  const token = req.headers.cookie?.split("=")[1];
  try {
    if (!token) return new AuthenticationError("Access denied, kindly log in.");

    const verified = jwt.verify(token, envConfig.USER_TOKEN_SECRET);

    if (!verified)
      return new AuthenticationError("Access denied, server error.");

    /* The line `const role = (verified as IVerified).role;` is casting the `verified` object to the
`IVerified` interface and then accessing the `role` property of the `verified` object. */
    const role = (verified as IVerified).role;
    /**
     * If the user is not logged in, return an error message.
     */
    if (roles && roles.length > 0 && !roles.includes(role)) {
      return new AuthenticationError("Access denied, kindly log in.");
    }

    /* The line `((req as ICustomRequest) || jwt).user = verified;` is assigning the `verified` object to
the `user` property of the `req` object. */
    ((req as ICustomRequest) || jwt).user = verified;
  } catch (error: any) {
    console.error(error.message);
    return new ValidationError("Invalidate error.");
  }
};
