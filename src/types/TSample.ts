import { TFile } from "./TFile";
import { TUser } from "./TUser";
import { TWork } from "./TWork";

export type TSample = {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description?: string;
  works: TWork[];
  users?: TUser[];
  files?: TFile[];
};

export type TSampleUpdate = {
  id: number;
  title: string;
  works: number[];
  users?: number[];
  description?: string;
  files?: TFile[];
};
