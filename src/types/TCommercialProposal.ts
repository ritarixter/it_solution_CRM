import { IProducts } from "./TProducts";

export type TCommercialProposal = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  products: Array<IProducts>;
};

export type TUpdateCommercialProposal = {
  id: number;
  name?: string;
  products?: Array<IProducts>;
};
