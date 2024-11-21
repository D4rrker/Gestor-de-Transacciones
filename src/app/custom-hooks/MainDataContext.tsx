"use client";

import {
  useContext,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { IMainData, IMainDataContext } from "@/app/types/propsMainDataContext";

const MainDataContext = createContext<IMainDataContext | undefined>(undefined);

export const MainDataProvider = ({ children }: { children: ReactNode }) => {
  const [mainData, setMainData] = useState<IMainData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("trs24");

    if (!storedData) {
      localStorage.setItem("trs24", JSON.stringify([]));
    } else {
      const parsedData = JSON.parse(storedData);
      setMainData(parsedData);
    }
  }, []);

  return (
    <MainDataContext.Provider value={{ mainData, setMainData }}>
      {children}
    </MainDataContext.Provider>
  );
};

export const useMainDataContext = () => {
  const context = useContext(MainDataContext);

  if (!context) {
    throw new Error(
      "useMainDataContext must be used within a MainDataProvider"
    );
  }
  return context;
};
