"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IOptionsNavbar } from "@/app/types/propsOptionsNavbarTypes";

interface AsideNavContextType {
  clickNavbar: number | null;
  setClickNavbar: React.Dispatch<React.SetStateAction<number | null>>;
  currentOption: IOptionsNavbar | null;
  setCurrentOption: React.Dispatch<React.SetStateAction<IOptionsNavbar | null>>;
  activeNavbar: boolean;
  setActiveNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  activeNavbarFilter: boolean;
  setActiveNavbarFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const AsideNavContext = createContext<AsideNavContextType | undefined>(
  undefined
);

export const AsideNavProvider = ({ children }: { children: ReactNode }) => {
  const [clickNavbar, setClickNavbar] = useState<number | null>(null);
  const [currentOption, setCurrentOption] = useState<IOptionsNavbar | null>(
    null
  );
  const [activeNavbar, setActiveNavbar] = useState(false);
  const [activeNavbarFilter, setActiveNavbarFilter] = useState(false);

  useEffect(() => {
    const router = new URL(window.location.href);
    const currentPath = router.pathname.split("/")[2] || 0;

    switch (currentPath) {
      case "transactions":
        setClickNavbar(1);
        break;
      case "graphics":
        setClickNavbar(2);
        break;

      default:
        setClickNavbar(0);
        break;
    }
  }, []);

  return (
    <AsideNavContext.Provider
      value={{
        clickNavbar,
        setClickNavbar,
        currentOption,
        setCurrentOption,
        activeNavbar,
        setActiveNavbar,
        activeNavbarFilter,
        setActiveNavbarFilter,
      }}
    >
      {children}
    </AsideNavContext.Provider>
  );
};

export const useAsideNavContext = () => {
  const context = useContext(AsideNavContext);
  if (!context) {
    throw new Error(
      "useAsideNavContext must be used within an AsideNavProvider"
    );
  }
  return context;
};
