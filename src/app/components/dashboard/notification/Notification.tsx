"use client";

import { Info } from "lucide-react";
import { categoriesAllocation } from "@/app/scripts/scriptCategoriesAllocation";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import { useEffect, useState } from "react";
import { IMainData } from "@/app/types/propsMainDataContext";

export default function Notification() {
  const [data, setData] = useState<number>(0);
  const { mainData } = useMainDataContext();

  const getHighExpenses = categoriesAllocation(mainData).sort(
    (a, b) => b.amount - a.amount
  )[0];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataStorage = localStorage.getItem("trs24");

      if (dataStorage) {
        const checkDataExpense = JSON.parse(dataStorage).some(
          (transaction: IMainData) => transaction.isExpense === true
        );
        setData(checkDataExpense);
      }
    }
  }, [data]);

  return (
    <div className="h-full flex flex-col text-[#1e1e1e] px-4 lg:px-8 py-4 ">
      {data > 0 ? (
        <div>
          <h1 className="w-full text-3xl font-medium">Notificaciones</h1>
          <div className="flex h-full items-center gap-x-2 text-orange-700">
            <div className="w-6 h-6">
              <Info className="w-6 h-6 " />
            </div>
            <span className="text-lg">
              La categoría donde se gastó más es en {'"'}
              <b>{getHighExpenses?.name}</b>
              {'"'}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex py-8">
          <div className="w-full flex flex-col justify-center items-center gap-y-4">
            <h1 className="text-3xl font-medium">No hay datos</h1>
            <p className="text-sm text-gray-500">
              No se puede mostrar la notificación
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
