import { Request } from "express";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  id: string;
  role: UserRole;
}

export interface IExtendedRequest extends Request {
  user?: IUser;
}
