"use client";

import { Plus } from "lucide-react";
import { Dispatch, FormEvent, useEffect, useState } from "react";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import { editTransaction } from "@/app/scripts/scriptEditTransaction";
import { IMainData } from "@/app/types/propsMainDataContext";

export default function ScreenEditTransaction({
  state,
  setState,
  transaction,
}: {
  state: boolean;
  setState: Dispatch<boolean>;
  transaction: IMainData | null;
}) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");

  const [isEmptyAmmount, setIsEmptyAmmount] = useState(false);
  const [isEmptyDate, setIsEmptyDate] = useState(false);
  const [isLenghtDescription, setIsLenghtDescription] = useState(false);

  const { setMainData } = useMainDataContext();

  useEffect(() => {
    if (transaction) {
      setDate(transaction.date || "");
      setCategory(transaction.categories[0] || "");
      setDescription(transaction.description || "");
      setAmount(transaction.amount || 0);
      setType(transaction.isExpense ? "gasto" : "ingreso");
    }
  }, [transaction]);

  const handleEditTransaction = (e: FormEvent) => {
    e.preventDefault();
    if (date.length === 0 || date.length > 10) return setIsEmptyDate(true);
    if (description.length > 40) return setIsLenghtDescription(true);
    if (amount === 0 || amount < 0) return setIsEmptyAmmount(true);

    editTransaction(
      {
        date,
        categories: [category],
        description,
        amount,
        isExpense: type === "gasto",
        id_transaction: transaction?.id_transaction || crypto.randomUUID(),
        id: transaction?.id || new Date().getTime(),
        title: `Transacción número ${transaction?.id || new Date().getTime()}`,
        color: "",
      },
      setMainData
    );
    setState(false);
  };

  return state ? (
    <div
      onClick={() => {
        setState(false);
      }}
      className={`fixed z-50 top-0 left-0 w-screen h-screen bg-white/80 flex justify-center items-center`}
    >
      <form action="">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-80 md:w-[550px] relative z-50 px-6 py-4 flex flex-col gap-y-6 bg-white rounded-md shadow-md border border-gray-200"
        >
          <div className="absolute right-6 top-4">
            <button
              onClick={(e) => {
                setState(false);
                e.preventDefault();
              }}
              className="focus:outline focus:outline-gray-300 rounded-md"
            >
              <Plus className="w-5 h-5 rotate-45 text-gray-600 hover:text-[#1e1e1e]" />
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[#1e1e1e] text-xl font-semibold">
              Modificar Transacción
            </h1>
            <p className="text-base text-gray-400 ">Ingrese los datos aquí.</p>
          </div>
          <div className="flex flex-col gap-y-6 text-[#1e1e1e]">
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2 relative">
              <label htmlFor="date" className="font-medium">
                Fecha
              </label>
              <input
                value={date}
                onChange={(e) => {
                  setIsEmptyDate(false);
                  setDate(e.target.value);
                }}
                type="date"
                id="date"
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isEmptyDate
                    ? "border-red-400 focus:outline-red-400"
                    : "focus:outline-gray-400"
                } `}
              />
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2 relative">
              <label htmlFor="category" className="font-medium">
                Categoría
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                id="category"
                className="border w-full md:w-9/12 p-2 rounded-md focus:outline-gray-400"
              >
                <option value="" disabled hidden>
                  Seleccionar categoría
                </option>
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
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2">
              <label htmlFor="description" className="font-medium">
                Descripción
              </label>
              <input
                value={description}
                onChange={(e) => {
                  setIsLenghtDescription(
                    e.target.value.length < 40 ? false : true
                  );
                  setDescription(e.target.value);
                }}
                type="text"
                placeholder="Descripción de la transacción"
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isLenghtDescription
                    ? "border-red-400 focus:outline-red-400"
                    : "focus:outline-gray-400"
                } `}
              />
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2 relative">
              <label htmlFor="ammount" className="font-medium">
                Cantidad
              </label>
              <input
                value={amount}
                onChange={(e) => {
                  setIsEmptyAmmount(false);
                  setAmount(parseFloat(e.target.value));
                }}
                type="number"
                placeholder="Cantidad el monto..."
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isEmptyAmmount
                    ? "border-red-400 focus:outline-red-400"
                    : "focus:outline-gray-400"
                } `}
              />
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2">
              <label htmlFor="type" className="font-medium">
                Tipo
              </label>
              <select
                onChange={(e) => setType(e.target.value)}
                value={type}
                id="type"
                className="border w-full md:w-9/12 p-2 rounded-md focus:outline-gray-400"
              >
                <option value="" disabled hidden>
                  Seleccionar tipo
                </option>
                <option value="ingreso">Ingreso</option>
                <option value="gasto">Gasto</option>
              </select>
            </div>
          </div>
          <div className="w-full flex md:justify-end mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEditTransaction(e);
              }}
              className="w-max self-end py-2 px-4 rounded-md text-white bg-[#1e1e1e] font-medium hover:bg-[#3e3e3e] transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : null;
}
