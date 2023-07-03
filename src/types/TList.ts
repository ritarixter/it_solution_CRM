import { TCompany } from "./TCompany";
import { TUser } from "./TUser";
import { TWork } from "./TWork";

export type TList = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  customer: string;
  description: string | null;
  endDate: Date;
  status: string  | null;
  importance: string | null;
  company: TCompany
  commercialProposal: any; //ПОМЕНЯТЬ
  users: TUser[]
  works: TWork[]
};
