"use client";

import { IMainData } from "@/app/types/propsMainDataContext";
import { calculateBalanceEvolution } from "@/app/scripts/scriptBalanceEvolution";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function BalanceEvolution({ data }: { data: IMainData[] }) {
  const [dataOps, setData] = useState<number>(0);

  const currentYear = new Date().getFullYear();

  const [yearSelected, setYearSelected] = useState<number>(currentYear);

  const dataBalanceEvolution = calculateBalanceEvolution(data, yearSelected);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataStorage = localStorage.getItem("trs24");

      if (dataStorage) {
        setData(JSON.parse(dataStorage).length);
      }
    }
  }, [dataOps]);

  return dataOps > 0 ? (
    <div className="w-full h-full flex flex-col justify-between text-[#1e1e1e] relative xl:px-6 pt-4">
      <div className="flex items-center justify-between px-4 lg:px-3">
        <h1 className="w-full text-3xl font-medium">Evolución Balance</h1>
        <select
          className="bg-slate-200 py-1 px-2 rounded-sm"
          onChange={(e) => setYearSelected(parseInt(e.target.value))}
        >
          <option value={currentYear} selected>
            {currentYear}
          </option>
          <option value={currentYear - 1}>{currentYear - 1}</option>
          <option value={currentYear - 2}>{currentYear - 2}</option>
        </select>
      </div>
      <div className="h-96 flex py-8">
        <ResponsiveContainer width="100%" height="100%" className="pr-2 xl:p-0">
          <LineChart data={dataBalanceEvolution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
            <YAxis unit="€" />
            <Tooltip
              formatter={(value) =>
                `${Number(value).toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}€`
              }
            />
            <Legend />
            <Line type="monotone" dataKey="Balance" stroke="#0060f3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <span className="absolute right-2 bottom-2 text-sm text-gray-500">
        {yearSelected}
      </span>
      <span className="absolute left-2 bottom-2 text-sm text-gray-500">
        {yearSelected - 1}
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
  );
}
