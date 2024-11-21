"use client";

import useCurrentAmount from "@/app/custom-hooks/useCurrentAmount";
import { useMainDataContext } from "@/app/custom-hooks/MainDataContext";

export default function TotalBalance() {
  const { mainData } = useMainDataContext();
  const currentAmount = useCurrentAmount(mainData);

  return (
    <div className="h-full flex flex-col justify-between text-[#1e1e1e]">
      <h1 className="w-full text-3xl font-medium pl-4 lg:pl-8 pt-4">
        Balance Total
      </h1>
      <div className="w-full flex items-center justify-center pb-10">
        <span
          className={`text-6xl font-bold ${
            currentAmount > "0" ? "text-green-600" : "text-red-600"
          }`}
        >
          {currentAmount}€
        </span>
      </div>
    </div>
  );
}
