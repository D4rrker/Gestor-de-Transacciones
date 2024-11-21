import { IMainData } from "../types/propsMainDataContext";

// Función para devolver las 4 últimas transacciones recientes
export function useRecentTransactions(mainData: IMainData[]) {
  const recentTransactions = mainData
    .slice(mainData.length < 4 ? 0 : mainData.length - 4, mainData.length)
    .sort((a, b) => b.id - a.id);

  return recentTransactions;
}
