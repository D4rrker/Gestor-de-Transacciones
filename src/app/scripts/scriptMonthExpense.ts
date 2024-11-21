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

// Función para obtener los gastos mensuales del año actual
export const months = (data: IMainData[]) => {
  // Se crea un array con los datos de la transacción
  const getMonth = data.map((transaction) => {
    const transformMonth = transaction.date.split("-");
    const month = parseInt(transformMonth[1], 10);
    const year = transformMonth[2];
    const { amount, id_transaction, isExpense } = transaction;

    return { month, year, id_transaction, isExpense, amount };
  });

  // Calcula el gasto por mes
  const getMonthExpense = (month: number) => {
    return getMonth
      .filter(
        (transaction) => transaction.isExpense && transaction.month === month
      )
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  interface Grafic {
    Gastos: string;
    months: string;
  }

  const currentMonth = new Date().getMonth() + 1; // Mes actual (1-12)

  // Devuelve un array con los datos para el gráfico de barras
  const getSixMonthsByFor = () => {
    const arrGrafic: Grafic[] = [];
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - i - 1 + 12) % 12; // Índice cíclico para obtener el mes
      arrGrafic.push({
        Gastos: getMonthExpense(monthIndex + 1)
          .toFixed(2)
          .toString(), // Suma de gastos del mes
        months: allMonths[monthIndex], // Nombre del mes
      });
    }

    return arrGrafic;
  };

  return getSixMonthsByFor().reverse();
};
