"use client";

import { Dispatch, FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { addTransaction } from "@/app/scripts/scriptAddTransaction";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";

export default function ScreenContentTransaction({
  dispatch,
}: {
  dispatch: Dispatch<boolean>;
}) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");

  const [isEmptyDate, setIsEmptyDate] = useState(false);
  const [isEmptyCategory, setIsEmptyCategory] = useState(false);
  const [isEmptyAmmount, setIsEmptyAmmount] = useState(false);
  const [isLengthDescritpion, setIsLenghtDescription] = useState(false);

  const { mainData, setMainData } = useMainDataContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (date.length === 0 || date.length > 10) return setIsEmptyDate(true);
    if (category.length === 0) return setIsEmptyCategory(true);
    if (amount === 0 || amount < 0) return setIsEmptyAmmount(true);
    if (description.length > 40) return setIsLenghtDescription(true);

    addTransaction(
      {
        date,
        categories: [category],
        description,
        amount,
        isExpense: type === "gasto",
        id: new Date().getTime(),
        id_transaction: crypto.randomUUID(),
        title: `Transacción número ${mainData.length + 1}`,
        color: "",
      },
      setMainData,
      dispatch
    );
    dispatch(false);
  };

  return (
    <div
      onClick={() => {
        dispatch(false);
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
              onClick={() => dispatch(false)}
              className="focus:outline focus:outline-gray-300 rounded-md"
            >
              <Plus className="w-5 h-5 rotate-45 text-gray-600 hover:text-[#1e1e1e]" />
            </button>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-[#1e1e1e] text-xl font-semibold">
              Añadir Nueva Transacción
            </h1>
            <p className="text-base text-gray-400 ">
              Ingrese los detalles de la nueva transacción aquí.
            </p>
          </div>
          <div className="flex flex-col gap-y-6 text-[#1e1e1e]">
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2 relative">
              <label htmlFor="date" className="font-medium">
                Fecha
              </label>
              <input
                required
                onChange={(e) => {
                  const value = e.target.value;
                  setDate(value);
                  setIsEmptyDate(false);
                }}
                type="date"
                id="date"
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isEmptyDate ? "border-red-400" : ""
                } focus:outline-gray-400 `}
              />
              {isEmptyDate ? (
                <p className="absolute -top-5 right-0  text-red-600 text-sm">
                  Debes ingresar una fecha válida
                </p>
              ) : null}
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2 relative">
              <label htmlFor="category" className="font-medium">
                Categoría
              </label>
              <select
                required
                onChange={(e) => {
                  setCategory(e.target.value);
                  setIsEmptyCategory(false);
                }}
                defaultValue=""
                id="category"
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isEmptyCategory ? "border-red-400" : ""
                } focus:outline-gray-400 `}
              >
                <option value="" disabled hidden>
                  Seleccionar categoría
                </option>
                <option value="alquiler">Alquiler</option>
                <option value="comida">Comida</option>
                <option value="sueldo">Sueldo</option>
                <option value="seguro">Seguro</option>
                <option value="suministros">Suministros</option>
                <option value="suscripciones">Suscripciones</option>
                <option value="transporte">Transporte</option>
                <option value="ocio">Ocio</option>
                <option value="otros">Otros</option>
              </select>
              {isEmptyCategory ? (
                <p className="absolute -top-5 right-0 text-sm text-red-600">
                  Añada una categoría
                </p>
              ) : null}
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2">
              <label htmlFor="description" className="font-medium">
                Descripción
              </label>
              <input
                required
                onChange={(e) => {
                  setIsLenghtDescription(
                    e.target.value.length < 40 ? false : true
                  );
                  setDescription(e.target.value);
                }}
                type="text"
                placeholder="Descripción de la transacción..."
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isLengthDescritpion
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
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value.replace(",", ".")));
                  setIsEmptyAmmount(false);
                }}
                type="number"
                placeholder="Cantidad del monto..."
                className={`border w-full md:w-9/12 p-2 rounded-md ${
                  isEmptyAmmount ? "border-red-400" : ""
                } focus:outline-gray-400 `}
              />
              {isEmptyAmmount ? (
                <p className="absolute -top-5 right-0 text-sm text-red-600">
                  Añade una cantidad válida
                </p>
              ) : null}
            </div>
            <div className="w-full flex flex-col md:flex-row md:items-center justify-end gap-x-5 gap-2">
              <label htmlFor="type" className="font-medium">
                Tipo
              </label>
              <select
                onChange={(e) => setType(e.target.value)}
                defaultValue=""
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
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="w-max self-end py-2 px-4 rounded-md text-white bg-[#1e1e1e] font-medium hover:bg-[#3e3e3e] transition-colors"
            >
              Guardar Transacción
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
