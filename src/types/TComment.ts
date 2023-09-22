import { TList } from "./TList";
import { TUser } from "./TUser";

export type TComment = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  list: TList;
  user: TUser;
};
