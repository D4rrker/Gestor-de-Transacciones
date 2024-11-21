import { IMainData } from "../types/propsMainDataContext";

// Función para editar una transacción
export const editTransaction = (
  transaction: IMainData,
  setMainData: (data: IMainData[]) => void
) => {
  const getAllTransactions = localStorage.getItem("trs24");

  if (!getAllTransactions) {
    return;
  }

  // Mejorable. Asigna un color al gasto
  const setColorByCategory = (category: string) => {
    switch (category) {
      case "alquiler":
        return "#0088FE";
      case "comida":
        return "#00C49F";
      case "sueldo":
        return "#FFAE00";
      case "seguro":
        return "#E44B00";
      case "suministros":
        return "#6C00FF";
      case "suscripciones":
        return "#FF5733";
      case "transporte":
        return "#4CAF50";
      case "ocio":
        return "#AAD700";
      case "otros":
        return "#1E90FF";
      default:
        return "#000000";
    }
  };

  const parsedData = JSON.parse(getAllTransactions);

  // Actualizar la lista de transacciones
  const updateListTransactions = parsedData.map(
    (transactionToUpdate: IMainData) => {
      if (transactionToUpdate.id_transaction === transaction.id_transaction) {
        return {
          ...transaction,
          date: transaction.date,
          categories: [transaction.categories[0]],
          description: transaction.description,
          amount: transaction.amount,
          isExpense: transaction.isExpense,
          color: setColorByCategory(transaction.categories[0]),
        };
      }

      return transactionToUpdate;
    }
  );

  localStorage.setItem("trs24", JSON.stringify(updateListTransactions));

  setMainData(updateListTransactions);
};
