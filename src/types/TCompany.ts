export type TCompany = {
  id: number;
  createdAt: string;
  updatedAt: string;
  nameCompany: string;
  name: string;
  numberPhone: string;
  INN: string;
  email?: string; //Email компании
};

export type TUpdateCompany = {
  id: number;
  nameCompany?: string;
  name?: string;
  numberPhone?: string;
  INN?: string;
  email?: string;
};
