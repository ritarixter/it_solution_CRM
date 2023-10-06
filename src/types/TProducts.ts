//Для КП
export interface IProducts {
  id: number;
  order: number;
  name: string;
  count: number;
  units: string; //Ед.изм
  price: number;
  actualPrice: number;
  dateWarehouse: string; //Дата доставки на склад
  dateObject: string; //Дата доставки на объект
  totalPrice: number;
  marginalityPrice?: number;
  checked?: boolean;
  isAddInSmeta?:boolean;
}
