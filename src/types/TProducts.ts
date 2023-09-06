//Для КП
export interface IProducts {
  id: number;
  order: number;
  name: string;
  count: number;
  units: string; //Ед.изм
  price: number;
  actualPrice: number;
  date: string;
  totalPrice: number;
  marginalityPrice: number;
  checked?: boolean;
}
