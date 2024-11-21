"use client";

import { PiggyBank } from "lucide-react";
import { useEffect, useState } from "react";
import { advice } from "@/app/scripts/scriptAdvice";

export default function Savings() {
  const [currentAdvice, setCurrentAdvice] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentAdvice((prevAdvice) => (prevAdvice + 1) % advice.length);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);
  return (
    <div className="h-full flex flex-col text-[#1e1e1e] px-4 lg:px-8 py-4 relative">
      <h1 className="w-full text-3xl font-medium">Consejos de Ahorro</h1>
      <div className="flex h-full gap-x-2">
        <div className="flex items-center gap-x-2 h-full">
          <div className="w-7 h-full flex items-center justify-center">
            <PiggyBank className="w-7 h-7 text-blue-600" />
          </div>
          <p
            className={`
            text-base text-muted-foreground
            transition-opacity duration-500 ease-in-out
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
          >
            {advice[currentAdvice]}
          </p>
        </div>
      </div>
      <h2 className="absolute right-8 min-w-max text-base font-medium hidden md:block text-gray-600">
        Consejo {currentAdvice + 1} de {advice.length}
      </h2>
    </div>
  );
}
