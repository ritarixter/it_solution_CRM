import { TComment } from "./TComment";
import { TNotify } from "./TNotify";

export type TUser = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  avatar: string;
  phone: string;
  access: string;
  username: string;
  password?: string;
  comments?: TComment[];
  notifications: TNotify[];
};

export type TUserUpdate = {
  id?: number;
  name?: string;
  avatar?: string;
  phone?: string;
  access?: string;
  username?: string;
  password?: string;
};
