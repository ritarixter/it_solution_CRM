import { IProducts } from "./TProducts";
import { TVariablesForMarginality } from "./TVariablesForMarginality";

export type TCommercialProposal = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  products: Array<IProducts>;
  summaSale: string;
  summaBuy: string;
  marginality: string;
  variablesForMarginality?: TVariablesForMarginality;
};

export type TUpdateCommercialProposal = {
  id: number;
  name?: string;
  products?: Array<IProducts>;
  summaSale?: string;
  summaBuy?: string;
  marginality?: string;
  variablesForMarginality?: TVariablesForMarginality;
};
