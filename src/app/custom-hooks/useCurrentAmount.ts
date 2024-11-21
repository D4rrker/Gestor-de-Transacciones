import { useEffect, useState } from "react";
import { IMainData } from "../types/propsMainDataContext";

export default function useCurrentAmount(mainData: IMainData[]) {
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const totalAmountExpense = mainData
      .filter((transaction) => transaction.isExpense)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalAmountIncome = mainData
      .filter((transaction) => !transaction.isExpense)
      .reduce((acc, curr) => acc + curr.amount, 0);

    setCurrentAmount(totalAmountIncome - totalAmountExpense);
  }, [mainData]);

  return currentAmount.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
