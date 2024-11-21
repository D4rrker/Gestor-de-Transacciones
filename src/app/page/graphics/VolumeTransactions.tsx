import { volumeTransactions } from "@/app/scripts/scriptVolumeTransactions";
import { IMainData } from "@/app/types/propsMainDataContext";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function VolumeTransactions({ data }: { data: IMainData[] }) {
  const [dataOps, setData] = useState<number>(0);

  const dataVolumeTransactions = volumeTransactions(data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataStorage = localStorage.getItem("trs24");

      if (dataStorage) {
        setData(JSON.parse(dataStorage).length);
      }
    }
  }, [dataOps]);

  return dataOps > 0 ? (
    <div className="w-full lg:h-full flex flex-col justify-between text-[#1e1e1e] relative xl:px-6 pt-4">
      <h1 className="w-full text-3xl font-medium px-4 lg:px-3">
        Volumen de Transacciones
      </h1>
      <div className="h-96 lg:h-full py-8">
        <ResponsiveContainer width="100%" height="100%" className="pr-2 xl:p-0">
          <BarChart data={dataVolumeTransactions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="num" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="transacciones"
              fill="#2f237b"
              name="Volumen de Transacciones"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
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
