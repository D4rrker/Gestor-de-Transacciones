import { IMainData } from "../types/propsMainDataContext";

interface newArray {
  num: string;
  semana: string;
  transacciones: number;
}

const allMonths = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Devuelve un array con los datos del volumen de transacciones por semana
export const volumeTransactions = (data: IMainData[]) => {
  const currentMounth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const number = new Date(currentYear, currentMounth, 0).getDate();

  const arr: newArray[] = [];

  // Filtrar solo los items que se encuentran en el mes actual
  const filterByWeek = (week: number, weekDays: number) => {
    const filterData = data.filter((transaction) => {
      const transactionDay = new Date(transaction.date).getDate();
      return transactionDay <= week && transactionDay >= week - weekDays;
    }).length;

    return filterData;
  };

  // Agrupamos las semanas en 7 días y si no se puede agrupar en 7 días, se agrupa con el restante
  for (let i = 1; i < Math.ceil(number / 7); i++) {
    const calculate = number - 7 * i;
    if (calculate > 7) {
      arr.push({
        num: `${number - calculate - 6} al ${number - calculate} de ${
          allMonths[currentMounth - 1]
        }`,
        semana: `Semana ${i}`,
        transacciones: filterByWeek(number - calculate, 6),
      });
    } else {
      arr.push({
        num: `${number - calculate - 6} al ${number} de ${
          allMonths[currentMounth - 1]
        }`,
        semana: `Semana ${i}`,
        transacciones: filterByWeek(number - calculate - 6, calculate),
      });
    }
  }

  return arr;
};
