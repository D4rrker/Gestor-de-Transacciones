import { IMainData } from "../types/propsMainDataContext";

// Función para convertir los datos en formato CSV
export const exportToCSV = (data: IMainData[], filename: string) => {
  const csvRows = [];

  // Agrega los encabezados (columnas del CSV)
  const headers = ["Fecha", "Categoría", "Descripción", "Cantidad", "Tipo"];
  csvRows.push(headers.join(";"));

  // Itera sobre las transacciones para formar las filas
  data.forEach((transaction) => {
    const row = [
      transaction.date,
      transaction.categories.join(", "),
      transaction.description != ""
        ? transaction.description
        : "Sin descripción",
      transaction.amount.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      transaction.isExpense ? "Gasto" : "Ingreso",
    ];
    csvRows.push(row.join(";"));
  });

  // Unir todas las filas con saltos de línea y pasarlo a UTF-8
  const BOM = "\uFEFF";
  const csvContent = BOM + csvRows.join("\n");

  // Crea un Blob con el contenido CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Crea un enlace para descargar el archivo
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);

  // Simula un clic en el enlace para descargar el archivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
