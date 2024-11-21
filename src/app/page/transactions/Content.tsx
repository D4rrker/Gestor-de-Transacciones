"use client";

import { Download, Plus, Filter } from "lucide-react";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import { contentTransactions } from "@/app/scripts/scriptContentTransactions";
import { IMainData } from "@/app/types/propsMainDataContext";
import { useEffect, useState } from "react";
import ListTransactions from "./ListTransactions";
import ScreenAddTransaction from "./ScreenAddTransaction";
import ScreenEditTransaction from "./ScreenEditTransaction";
import { exportToCSV } from "@/app/scripts/scriptDownloadCSV";
import {
  totalExpenses,
  totalDeposits,
  totalBalance,
  parseFormattedNumber,
} from "@/app/scripts/scriptTransoformDigitsToEs";
import { useAsideNavContext } from "@/app/custom-hooks/AsideNavContext";

export default function Content() {
  const [contentData, setContentData] = useState<IMainData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [selectedType, setSelectedType] = useState("todos");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<IMainData | null>(null);
  const [showScreenEditTra, setShowScreenEditTra] = useState(false);
  const [showScreenTra, setShowScreenTra] = useState(false);
  const { mainData } = useMainDataContext();
  const { activeNavbarFilter, setActiveNavbarFilter } = useAsideNavContext();

  useEffect(() => {
    const filteredData = contentTransactions(
      mainData,
      selectedCategory,
      selectedType,
      selectedDate
    );
    setContentData(filteredData);
  }, [mainData, selectedCategory, selectedType, selectedDate]);

  const handleEditTransaction = (transaction: IMainData) => {
    setSelectedTransaction(transaction);
    setShowScreenEditTra(true);
  };

  const expenses = totalExpenses(mainData).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const deposits = totalDeposits(mainData).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const balance = totalBalance(mainData).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const expensesNumber = parseFormattedNumber(expenses);
  const depositsNumber = parseFormattedNumber(deposits);

  return (
    <div className="2xl:w-3/5 w-full flex flex-col gap-y-6 ">
      <header className="flex flex-col">
        <h1 className="text-3xl text-center font-medium p-6 lg:mb-8 lg:p-0 lg:text-start">
          Transacciones
        </h1>
        <div className="fixed top-0 right-0 z-40 flex">
          <span
            className="p-4 rounded-full backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setActiveNavbarFilter(!activeNavbarFilter)}
          >
            <Filter className="text-gray-500" />
          </span>
        </div>
        <div
          className={`fixed right-0 top-0 w-full h-screen z-30 ${
            activeNavbarFilter ? "translate-x-0" : "translate-x-full"
          } transition-all duration-300 lg:relative lg:w-auto lg:h-auto lg:translate-x-0`}
        >
          <div
            className={`h-full flex flex-col gap-y-10 p-6 pt-20 bg-white lg:bg-transparent lg:p-0 lg:flex-row lg:h-10 lg:gap-x-6 `}
          >
            <div className="flex flex-col gap-y-2 lg:h-full">
              <label className="font-medium lg:hidden">Categoría</label>
              <select
                className="w-full py-2 px-1 rounded-md pl-2 border lg:pl-2 lg:h-full"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" hidden>
                  Seleccionar categoría
                </option>
                <option value="todas">Todas</option>
                <option value="alquiler">Alquiler</option>
                <option value="comida">Comida</option>
                <option value="ocio">Ocio</option>
                <option value="otros">Otros</option>
                <option value="sueldo">Sueldo</option>
                <option value="seguro">Seguro</option>
                <option value="suministros">Suministros</option>
                <option value="suscripciones">Suscripciones</option>
                <option value="transporte">Transporte</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2 lg:h-full">
              <label className="font-medium lg:hidden">
                Tipo de transacción
              </label>
              <select
                className="w-full py-2 px-1 rounded-md pl-2 border lg:pl-2 lg:h-full"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="" hidden>
                  Seleccionar tipo
                </option>
                <option value="todos">Todo</option>
                <option value="ingreso">Ingresos</option>
                <option value="gasto">Gastos</option>
              </select>
            </div>
            <div className="flex flex-col gap-y-2 lg:h-full">
              <label className="font-medium lg:hidden">Fecha</label>
              <input
                type="date"
                className="w-full py-2 px-1 rounded-md pl-2 border lg:pl-2 lg:h-full"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={`flex flex-col gap-4 md:flex-row lg:mt-10`}>
          <div className="w-full flex flex-col justify-between gap-y-2 p-6 rounded-lg shadow-sm border border-gray-300 bg-white">
            <span className="text-xl">Balance Total</span>
            <span
              className={`text-4xl font-medium ${
                expensesNumber > depositsNumber
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {balance}€
            </span>
          </div>
          <div className="w-full flex flex-col justify-between  gap-y-2 p-6 rounded-lg shadow-sm border border-gray-300 bg-white">
            <span className="text-xl">Ingresos Totales</span>
            <span className="text-4xl font-medium text-green-600">
              {deposits}€
            </span>
          </div>
          <div className="w-full flex flex-col justify-between  gap-y-2 p-6 rounded-lg shadow-sm border border-gray-300 bg-white">
            <span className="text-xl">Gastos Totales</span>
            <span className="text-4xl font-medium text-red-600">
              {expenses}€
            </span>
          </div>
        </div>
      </header>
      <main className="flex flex-col gap-y-10">
        <ListTransactions handle={handleEditTransaction} data={contentData} />
        <div className="flex flex-col items-center gap-y-6 md:flex-row md:justify-between">
          <button
            className="bg-white text-[#1e1e1e] border px-4 py-3 rounded-md w-full flex justify-center items-center gap-x-2 font-medium transition-colors duration-150 hover:bg-gray-200 hover:text-[#3e3e3e] md:w-max"
            onClick={() => exportToCSV(mainData, "transacciones")}
          >
            <Download size={20} />
            Exportar a CSV
          </button>
          <button
            className="bg-[#1e1e1e] text-white px-4 py-3 rounded-md w-full flex justify-center items-center gap-x-2 font-medium transition-colors duration-150 hover:bg-[#3e3e3e] md:w-max"
            onClick={() => setShowScreenTra(true)}
          >
            <Plus size={20} />
            Añadir transacción
          </button>
        </div>
      </main>
      <ScreenAddTransaction state={showScreenTra} setState={setShowScreenTra} />
      <ScreenEditTransaction
        state={showScreenEditTra}
        setState={setShowScreenEditTra}
        transaction={selectedTransaction}
      />
    </div>
  );
}
