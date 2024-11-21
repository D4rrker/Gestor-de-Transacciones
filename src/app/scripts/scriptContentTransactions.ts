import { IMainData } from "../types/propsMainDataContext";

// Función para filtrar y ordenar las transacciones
export const contentTransactions = (
  data: IMainData[],
  seleCategory: string,
  transactionType: string,
  transactionDate: string
) => {
  // Filtrar por categoría
  const filterByCategory = (transaction: IMainData) => {
    if (seleCategory === "todas") return true;

    const selected = transaction.categories.includes(seleCategory);
    if (selected && seleCategory) return selected;
  };

  // Filtrar por tipo (ingreso/gasto)
  const filterByType = (transaction: IMainData) => {
    if (transactionType === "ingreso") return !transaction.isExpense;
    if (transactionType === "gasto") return transaction.isExpense;
    return true; // Si no se especifica tipo, incluir todos
  };

  // Filtrar por fecha
  const filterByDate = (transaction: IMainData) => {
    if (transactionDate === "") return true;

    const transactionDateQuery = new Date(transactionDate).getTime();
    const transactionDateNumber = new Date(transaction.date).getTime();

    return transactionDateQuery === transactionDateNumber;
  };

  // Filtrar por categoría, tipo y fecha
  const dataForTable = data.filter(
    (transaction) =>
      filterByCategory(transaction) &&
      filterByType(transaction) &&
      filterByDate(transaction)
  );

  // Ordenar por fecha
  dataForTable.sort((a, b) => {
    return b.id - a.id;
  });

  return dataForTable;
};
