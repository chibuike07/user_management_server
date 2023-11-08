import { JwtPayload, Secret } from "jsonwebtoken";
import { Request } from "express";

export interface ICustomRequest extends Request {
  user: string | JwtPayload;
}

export interface IResolveRequest extends Request {
  user: {
    role: string;
    id: string;
  };
}

export interface IVerified extends JwtPayload {
  role: string;
  id: string;
}

export interface IEnv {
  USER_TOKEN_KEY: string;
  USER_TOKEN_SECRET: Secret;
}

export interface IUserVeriTokenFun {
  roles?: string[] | string;
}
