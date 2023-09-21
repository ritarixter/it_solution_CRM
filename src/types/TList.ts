import { TComment } from "./TComment";
import { TCommercialProposal } from "./TCommercialProposal";
import { TCompany } from "./TCompany";
import { TFile } from "./TFile";
import { TStep } from "./TStep";
import { TUser } from "./TUser";
import { TWork } from "./TWork";

export type TList = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  customer: string;
  address: string;
  endDate: Date;
  status: string | null;
  importance: string | null;
  company: TCompany;
  commercialProposal: TCommercialProposal;
  users: TUser[];
  works: TWork[];
  files: TFile[];
  step: TStep;
  comments?: TComment[]
};

export type TUpdateList = {
  id: number;
  idCompany?: number;
  name?: string;
  address?: string;
  customer?: string;
  files?: TFile[];
  status?: string;
  importance?: string;
  users: number[];
};
