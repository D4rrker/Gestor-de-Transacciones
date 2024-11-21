"use client";

import { deleteTransaction } from "@/app/scripts/scriptDeleteTransaction";
import { IMainData } from "@/app/types/propsMainDataContext";
import { Edit, Trash2 } from "lucide-react";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import { editTransaction } from "@/app/scripts/scriptEditTransaction";

export default function ListTransactions({
  data,
  handle,
}: {
  data: IMainData[];
  handle: (transaction: IMainData) => void;
}) {
  const { setMainData } = useMainDataContext();

  const handleDeleteTransaction = (id: number) => {
    deleteTransaction(id, setMainData);
  };

  const handleEditTransaction = (transaction: IMainData) => {
    editTransaction(transaction, setMainData);
  };

  return (
    <div className="flex lg:flex-col bg-white border border-gray-200 w-full rounded-lg shadow-sm overflow-hidden p-3 md:p-6">
      <div className="grid items-center pr-1 lg:p-3 font-medium text-gray-600 border-r lg:grid-cols-ul-transactions lg:border-none">
        <span>Fecha</span>
        <span>Categoría</span>
        <span>Descripción</span>
        <span>Cantidad</span>
        <span>Acciones</span>
      </div>
      <ul
        className={`w-full max-h-96 overflow-y-auto flex ${
          data.length < 2 ? "justify-center" : ""
        } lg:flex-col`}
      >
        {data.length != 0 ? (
          data.map((transaction: IMainData, index: number) => {
            const toLocale = transaction.amount.toLocaleString("es-ES", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            const dateTransform = transaction.date.split("-");
            const [year, month, day] = dateTransform;
            const newDate = `${day}-${month}-${year}` || "";

            // Hacer la primera letra en mayúscula
            if (transaction.categories.length === 0) return;

            const categoryTransformed =
              transaction.categories[0].charAt(0).toUpperCase() +
              transaction.categories[0].slice(1);

            return (
              <li
                key={index}
                className={`w-full grid grid-rows-5 place-items-center lg:place-items-stretch lg:items-center lg:grid-cols-ul-transactions px-6 lg:grid-rows-1 lg:p-4 lg:border-t text-base text-[#1e1e1e] ${
                  index % 2 === 1 ? "bg-gray-100" : ""
                }`}
              >
                <span>{newDate}</span>
                <span className="flex gap-x-2 items-center">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: transaction.color }}
                  ></div>
                  {categoryTransformed}
                </span>
                <span className="text-center lg:text-start lg:mx-2 text-gray-600">
                  {transaction.description.length != 0 ? (
                    <b>{transaction.description}</b>
                  ) : (
                    <i className="text-gray-400">Sin descripción</i>
                  )}
                </span>
                <span
                  className={`${
                    transaction.isExpense ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {transaction.isExpense ? "-" : "+"}
                  {toLocale}€
                </span>
                <span className="flex">
                  <button
                    onClick={() => {
                      handleEditTransaction(transaction);
                      handle(transaction);
                    }}
                    className={`p-3 rounded-md mr-4 ${
                      index % 2 === 0 ? "hover:bg-gray-100" : "hover:bg-white"
                    } transition-all`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className={`p-3 rounded-md ${
                      index % 2 === 0 ? "hover:bg-gray-100" : "hover:bg-white"
                    } transition-all`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </span>
              </li>
            );
          })
        ) : (
          <div className="w-full text-center mt-6 text-[#1e1e1e]">
            No se han encontrado transacciones.
          </div>
        )}
      </ul>
    </div>
  );
}
