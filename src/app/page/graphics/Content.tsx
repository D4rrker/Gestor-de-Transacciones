"use client";

import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import StackedBarChart from "./EntriesAndExpenses";
import BalanceEvolution from "./BalanceEvolution";
import VolumeTransactions from "./VolumeTransactions";

export default function Content() {
  const { mainData } = useMainDataContext();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="mt-6 lg:m-0">
        <h1 className="text-3xl font-medium p-6 lg:mb-8 lg:p-0 ">Gráficos</h1>
      </div>
      <div className="w-full h-full flex flex-col gap-6 lg:m-0">
        <div className="flex flex-col xl:flex-row gap-6 h-min">
          <div className="bg-white border-gray-200 w-full border rounded-lg overflow-hidden shadow-md">
            <StackedBarChart data={mainData} />
          </div>
          <div className="bg-white border-gray-200 w-full border rounded-lg overflow-hidden shadow-md">
            <BalanceEvolution data={mainData} />
          </div>
        </div>
        <div className="mt-6 lg:m-0 flex w-full h-full">
          <div className="bg-white border-gray-200 border w-full rounded-lg overflow-hidden shadow-md">
            <VolumeTransactions data={mainData} />
          </div>
        </div>
      </div>
    </div>
  );
}
