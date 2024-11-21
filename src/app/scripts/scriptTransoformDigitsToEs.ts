import { IMainData } from "../types/propsMainDataContext";

// Función para obtener el total de gastos
export const totalExpenses = (data: IMainData[]) => {
  const filteredByExpenses = data.filter(
    (transaction: IMainData) => transaction.isExpense
  );
  const incrementWithReduce = filteredByExpenses.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);

  return incrementWithReduce;
};

// Función para obtener el total de ingresos
export const totalDeposits = (data: IMainData[]) => {
  const filteredByDeposits = data.filter(
    (transaction: IMainData) => !transaction.isExpense
  );
  const incrementWithReduce = filteredByDeposits.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);

  return incrementWithReduce;
};

// Función para calcular el balance total
export const totalBalance = (data: IMainData[]) => {
  const expenses = totalExpenses(data);
  const deposits = totalDeposits(data);

  return deposits - expenses;
};

// Función para parsear el número con separadores de decimales
export const parseFormattedNumber = (formattedNumber: string) => {
  return parseFloat(formattedNumber.replace(/\./g, "").replace(",", "."));
};
