"use client";

import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Rectangle,
  Legend,
} from "recharts";
import { months } from "@/app/scripts/scriptMonthExpense";
import { useEffect, useState } from "react";
import { IMainData } from "@/app/types/propsMainDataContext";

export default function ExpenseBalance() {
  const [data, setData] = useState<number>(0);
  const { mainData } = useMainDataContext();

  const getYear = new Date().getFullYear();

  const dataForLineChart = months(mainData);

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
  }, []);

  return (
    <div className="h-full flex flex-col justify-between text-[#1e1e1e] px-4 lg:px-8 pt-4 relative">
      {data > 0 ? (
        <div>
          <h1 className="w-full text-3xl font-medium">Gastos Mensuales</h1>
          <div className="h-96 flex py-8">
            <ResponsiveContainer>
              <BarChart data={dataForLineChart} margin={{ left: 15 }}>
                <XAxis dataKey="months" />
                <YAxis unit={"€"} />
                <Tooltip
                  formatter={(value) =>
                    `${Number(value).toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}€`
                  }
                />
                <Legend />
                <Bar
                  dataKey="Gastos"
                  fill="#0087ff"
                  activeBar={<Rectangle fill="#74beff" stroke="#0087ff" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="absolute right-2 bottom-2 text-sm text-gray-500">
            {getYear}
          </span>
          <span className="absolute left-2 bottom-2 text-sm text-gray-500">
            {getYear - 1}
          </span>
        </div>
      ) : (
        <div className="w-full h-full flex py-8">
          <div className="w-full flex flex-col justify-center items-center gap-y-4">
            <h1 className="text-3xl font-medium">No hay datos</h1>
            <p className="text-sm text-gray-500">
              No hay transacciones registradas
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
