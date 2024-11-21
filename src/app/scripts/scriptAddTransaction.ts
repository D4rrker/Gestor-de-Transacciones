import { IMainData } from "../types/propsMainDataContext";

// Función para agregar una transacción
export const addTransaction = (
  data: IMainData,
  setMainData: (data: IMainData[]) => void,
  dispatch: (data: boolean) => void
) => {
  const dataFromStorage = localStorage.getItem("trs24");

  if (!dataFromStorage) {
    localStorage.setItem("trs24", JSON.stringify([data]));
    return;
  }

  // Mejorable
  const setColorByCategory = (category: string) => {
    switch (category) {
      case "alquiler":
        return "#0088FE";
      case "comida":
        return "#00C49F";
      case "sueldo":
        return "#FFAE00";
      case "seguro":
        return "#E44B00";
      case "suministros":
        return "#6C00FF";
      case "suscripciones":
        return "#FF5733";
      case "transporte":
        return "#4CAF50";
      case "ocio":
        return "#AAD700";
      case "otros":
        return "#1E90FF";
      default:
        return "#000000";
    }
  };

  const newData = { ...data, color: setColorByCategory(data.categories[0]) };

  const parsedData = JSON.parse(dataFromStorage);
  parsedData.push(newData);

  localStorage.setItem("trs24", JSON.stringify(parsedData));

  setMainData(parsedData);
  dispatch(false);
};
