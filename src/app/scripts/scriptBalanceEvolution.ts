import { IMainData } from "../types/propsMainDataContext";

interface newArray {
  month: string;
  Balance: number;
}

const allMonths = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

// Funcion para calcular el balance mensual
export const calculateBalanceEvolution = (data: IMainData[], year: number) => {
  const currentYear = new Date().getFullYear();
  const mounthSelected = year != currentYear ? 12 : new Date().getMonth() + 1;

  // Obtiene los ingresos del año actual y del mes correspondiente
  const getEntries = (month: number) => {
    return data
      .filter(
        (transaction) =>
          !transaction.isExpense &&
          new Date(transaction.date).getFullYear() === year &&
          new Date(transaction.date).getMonth() + 1 === month
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Obtiene los gastos del año actual y del mes correspondiente
  const getExpenses = (month: number) => {
    return data
      .filter(
        (transaction) =>
          transaction.isExpense &&
          new Date(transaction.date).getFullYear() === year &&
          new Date(transaction.date).getMonth() + 1 === month
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Devuelve un array con los datos para el gráfico de barras
  const getMonths = () => {
    const newArray: newArray[] = [];
    for (let index = 0; index < mounthSelected; index++) {
      newArray.push({
        month: allMonths[index],
        Balance: getEntries(index + 1) - getExpenses(index + 1),
      });
    }

    return newArray;
  };

  return getMonths();
};
