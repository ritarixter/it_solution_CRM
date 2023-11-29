export type TWork = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export interface IWorks {
  id: number;
  name: string;
  count: number;
  units: string; //Ед.изм
  price: number;
  totalPrice: number;
  checked?: boolean;
  isAddInSmeta?: boolean;
}
