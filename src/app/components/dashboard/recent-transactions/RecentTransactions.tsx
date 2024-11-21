"use client";

import Link from "next/link";
import LiRecentTransaction from "./LiRecentTransaction";

import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";
import { useRecentTransactions } from "@/app/scripts/scriptRecentTransactions";
import { IMainData } from "@/app/types/propsMainDataContext";
import { useAsideNavContext } from "@/app/custom-hooks/AsideNavContext";
import { useEffect, useState } from "react";

export default function RecentTransactions() {
  const [data, setData] = useState<number>(0);
  const { mainData } = useMainDataContext();
  const { setClickNavbar } = useAsideNavContext();
  const recentTransactions = useRecentTransactions(mainData);

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
    <div className="h-full flex flex-col justify-between text-[#1e1e1e] px-4 lg:px-8 py-4">
      {data > 0 ? (
        <div className="h-full grid grid-rows-[min-content_1fr] gap-y-6">
          <div>
            <h1 className="w-full text-3xl font-medium">
              Transacciones Recientes
            </h1>
          </div>
          <div className="flex flex-col">
            <ul className="w-full h-full flex flex-col gap-y-4">
              {recentTransactions.map((transaction: IMainData) => {
                return (
                  <LiRecentTransaction
                    key={transaction.id_transaction}
                    obj_transaction={transaction}
                  />
                );
              })}
            </ul>
            <div className="w-max">
              <Link
                href={"/page/transactions"}
                onClick={() => setClickNavbar(1)}
              >
                <button className="flex items-center justify-center py-2 px-6 rounded-md border hover:bg-gray-100 active:scale-95 transition-transform">
                  <span className="text-base font-medium">
                    Ver todas las transacciones
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex py-8">
          <div className="w-full flex flex-col justify-center items-center gap-y-4">
            <h1 className="text-3xl font-medium">No hay datos</h1>
            <p className="text-sm text-gray-500">
              No se puede mostrar las transacciones recientes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
