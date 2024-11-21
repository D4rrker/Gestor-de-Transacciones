"use client";

import { Pie, ResponsiveContainer, PieChart, Cell, Tooltip } from "recharts";
import { categoriesAllocation } from "@/app/scripts/scriptCategoriesAllocation";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import { useEffect, useState } from "react";
import { IMainData } from "@/app/types/propsMainDataContext";

export default function CategoryAllocation() {
  const [data, setData] = useState<number>(0);
  const { mainData } = useMainDataContext();

  const dataForPieChart = categoriesAllocation(mainData);
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

  return data > 0 ? (
    <div className="h-full flex flex-col lg:flex-row justify-between text-[#1e1e1e] px-4 lg:px-8 py-4">
      <div className="flex flex-col gap-y-6">
        <h1 className="w-max text-3xl font-medium">Asignación de Categorias</h1>
        <div className="flex justify-center lg:justify-start h-full">
          <ul className="grid grid-flow-col lg:grid-rows-4 place-content-start gap-x-14 gap-y-4 lg:gap-y-0 h-auto">
            {dataForPieChart.map((category, index) => {
              return (
                <li className="flex gap-2 items-center" key={index}>
                  <div
                    className={`w-3 h-3 rounded-full`}
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span>{category.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-full h-full">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dataForPieChart}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {dataForPieChart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                `${Number(value).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}€`
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  ) : (
    <div className="w-full h-full flex py-8">
      <div className="w-full flex flex-col justify-center items-center gap-y-4">
        <h1 className="text-3xl font-medium">No hay datos</h1>
        <p className="text-sm text-gray-500">
          No se puede mostrar la asignación de categorías
        </p>
      </div>
    </div>
  );
}
