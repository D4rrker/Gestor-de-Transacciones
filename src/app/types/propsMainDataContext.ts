export interface IMainData {
  id: number;
  id_transaction: string;
  title: string;
  date: string;
  amount: number;
  categories: string[];
  description: string;
  isExpense: boolean;
  color: string;
}

export interface IMainDataContext {
  mainData: IMainData[];
  setMainData: (data: IMainData[]) => void;
}
