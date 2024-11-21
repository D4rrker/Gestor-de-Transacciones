import type { Metadata } from "next";
import "./globals.css";

// Importaciones de componentes
import AsideBar from "./components/aside/AsideBar";
import { MainDataProvider } from "./custom-hooks/MainDataContext";
import { AsideNavProvider } from "./custom-hooks/AsideNavContext";

export const metadata: Metadata = {
  title: "Gestor de transacciones",
  description: "Gestiona tus transacciones de forma sencilla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-100 flex flex-col lg:flex-row max-h-screen">
        <AsideNavProvider>
          <AsideBar />
          <MainDataProvider>
            <main className="flex justify-center w-full lg:h-screen lg:overflow-hidden p-2 md:p-6">
              {children}
            </main>
          </MainDataProvider>
        </AsideNavProvider>
      </body>
    </html>
  );
}
