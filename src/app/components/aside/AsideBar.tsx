"use client";

import Link from "next/link";
import { useAsideNavContext } from "@/app/custom-hooks/AsideNavContext";
import LiNavbar from "../li-navbar/LiNavbar";
import { options } from "@/app/scripts/scriptOptionsNavbar";
import { ArrowLeftFromLineIcon } from "lucide-react";

export default function AsideBar() {
  const {
    clickNavbar,
    setClickNavbar,
    setCurrentOption,
    setActiveNavbar,
    activeNavbar,
    setActiveNavbarFilter,
  } = useAsideNavContext();

  return (
    <aside
      className={`min-w-64 h-screen fixed top-0 left-0 ${
        activeNavbar ? "translate-x-0" : "-translate-x-full"
      } w-full transition-transform duration-300 z-50 bg-white lg:relative lg:translate-x-0 lg:w-auto`}
    >
      <div className="h-full">
        <nav className="w-full h-full flex flex-col pt-14 relative border">
          <span
            className={`absolute top-0 right-0 ${
              activeNavbar ? "translate-x-0" : "translate-x-full"
            } p-3 rounded-lg lg:hidden cursor-pointer hover:bg-gray-300/80`}
            onClick={() => {
              setActiveNavbar(!activeNavbar);
              setActiveNavbarFilter(false);
            }}
          >
            <ArrowLeftFromLineIcon
              className={`${
                activeNavbar ? "rotate-0" : "rotate-180"
              } text-gray-500`}
            />
          </span>

          <ul className="flex w-full flex-col ">
            {options.map((option) => {
              return (
                <Link href={`${option.href}`} key={option.id}>
                  <LiNavbar
                    object={option}
                    stateClickNavbar={clickNavbar}
                    setStateActiveNavbar={setActiveNavbar}
                    setStateClickNavbar={(id) => {
                      setClickNavbar(id);
                      setCurrentOption(option);
                    }}
                  />
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
