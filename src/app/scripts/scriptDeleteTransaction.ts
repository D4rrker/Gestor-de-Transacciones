import { IMainData } from "../types/propsMainDataContext";

// Función para eliminar una transacción
export const deleteTransaction = (
  id: number,
  setMainData: (data: IMainData[]) => void
) => {
  const getAllTransactions = localStorage.getItem("trs24");

  if (!getAllTransactions) {
    return;
  }

  const parsedData = JSON.parse(getAllTransactions);

  // Actualizar la lista de transacciones eliminando la transacción
  const updateListTransactions = parsedData.filter(
    (transaction: IMainData) => transaction.id !== id
  );

  localStorage.setItem("trs24", JSON.stringify(updateListTransactions));

  setMainData(updateListTransactions);
};
