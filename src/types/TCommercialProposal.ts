import { IProducts } from "./TProducts";

export type TCommercialProposal = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  products: Array<IProducts>;
  summa: string;
  marginality: string;
  variablesForMarginality: Array<TUpdateCommercialProposal>;
};

export type TUpdateCommercialProposal = {
  id: number;
  name?: string;
  products?: Array<IProducts>;
};
