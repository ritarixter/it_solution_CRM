import { TCommercialProposal } from "./TCommercialProposal";
import { TCompany } from "./TCompany";
import { TFile } from "./TFile";
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
  status: string | null;
  importance: string | null;
  company: TCompany;
  commercialProposal: TCommercialProposal;
  users: TUser[];
  works: TWork[];
  files: TFile[];
};

export type TUpdateList = {
  id: number;
  idCompany?: number;
  name?: string;
  customer?: string;
  description?: string;
  files?: TFile[];
  status?: string;
  importance?: string;
  users: number[];
};
