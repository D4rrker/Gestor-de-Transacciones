import { IMainData } from "../types/propsMainDataContext";

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

interface newArray {
  month: string;
  Ingresos: number;
  Gastos: number;
}

// Función para obtener los ingresos y gastos mensuales del año actual
export const entriesAndExpenses = (data: IMainData[], year: number) => {
  const currentYear = new Date().getFullYear();
  const mounthSelected = year != currentYear ? 12 : new Date().getMonth() + 1;

  const getMonth = data.map((transaction) => {
    const { date, amount, isExpense, categories } = transaction;
    const year = parseInt(date.split("-")[0]);
    const month = parseInt(date.split("-")[1]);

    return { year, month, amount, isExpense, categories };
  });

  // Obtener las transacciones que sean gastos del año actual.
  const getExpesesTransactions = (month: number) => {
    return getMonth
      .filter(
        (item) => item.isExpense && item.year === year && item.month === month
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Obtener las transacciones que sean ingresos del año actual.
  const getEntriesTransactions = (month: number) => {
    return getMonth
      .filter(
        (item) => !item.isExpense && item.year === year && item.month === month
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  // Devuelve un array con los datos para el gráfico de barras
  const getMonths = () => {
    const newArray: newArray[] = [];
    for (let index = 0; index < mounthSelected; index++) {
      newArray.push({
        month: allMonths[index],
        Ingresos: getEntriesTransactions(index + 1),
        Gastos: getExpesesTransactions(index + 1),
      });
    }

    return newArray;
  };

  return getMonths();
};
