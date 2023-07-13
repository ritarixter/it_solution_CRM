import { TUser } from "./TUser";
import { TWork } from "./TWork";

export type TSample = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description?: string;
  works: TWork[];
  users?: TUser[];
};
