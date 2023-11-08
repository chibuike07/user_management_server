import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Response } from "express";
import { envConfig } from "../../config/config";
config();

/**
 * It generates a token and sets a cookie with the token.
 * </code>
 * @param res - response object
 * @param _id - the id of the user
 * @param role - the role of the user
 * @param data - is the user data
 * @returns A function that takes in a response object, id, role, and data.
 */
export const userGenerateToken = async (
  res: Response,
  _id: string,
  role: string
) => {
  const expiration = process.env.DB_ENV === "testing" ? 100 : 604800000;
  const token = jwt.sign({ id: _id, role }, envConfig.USER_TOKEN_SECRET, {
    expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
  });

  res.cookie(envConfig.USER_TOKEN_KEY, token, {
    expires: new Date(Date.now() + expiration),
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "none",
    secure: true,
  });

  return token;
};
