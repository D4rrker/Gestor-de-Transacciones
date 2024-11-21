import { IMainData } from "../types/propsMainDataContext";

// Función para agrupar los gastos por categoría y sumar los montos
export const categoriesAllocation = (data: IMainData[]) => {
  // Filtrar solo los items que son gastos
  const expenses = data.filter((item: IMainData) => item.isExpense);

  // Hacer la primera letra en mayúscula
  function capitalizeFirstLetter(category: string): string {
    if (!category) return category;
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  // Mejorable
  const setColorByCategory = (category: string) => {
    switch (category) {
      case "Alquiler":
        return "#0088FE";
      case "Comida":
        return "#00C49F";
      case "Sueldo":
        return "#FFAE00";
      case "Seguro":
        return "#E44B00";
      case "Suministros":
        return "#6C00FF";
      case "Suscripciones":
        return "#FF5733";
      case "Transporte":
        return "#4CAF50";
      case "Ocio":
        return "#AAD700";
      case "Otros":
        return "#1E90FF";
      default:
        return "#000000";
    }
  };

  // Agrupar los gastos por categoría y sumar los montos
  const groupedExpenses = expenses.reduce((acc, item) => {
    const { categories, amount } = item;

    categories.forEach((category) => {
      const capitalizedCategory = capitalizeFirstLetter(category);

      // Si la categoría ya existe, suma el monto
      if (acc[capitalizedCategory]) {
        acc[capitalizedCategory].amount += amount;
      } else {
        // Si no existe, inicializa con el monto actual y asigna un color
        acc[capitalizedCategory] = {
          amount: amount,
          color: setColorByCategory(capitalizedCategory),
        };
      }
    });

    return acc;
  }, {} as Record<string, { amount: number; color: string }>);

  // Total del monto de todos los gastos
  // const totalAmount = expenses.reduce((acc, item) => acc + item.amount, 0);

  // const getPercentage = (amount: number, totalAmount: number) => {
  //   return (amount / totalAmount) * 100;
  // };

  // Convertir el objeto en un array de objetos con el formato {name, amount, color}
  const result = Object.keys(groupedExpenses).map((category) => ({
    name: category,
    amount: Number(groupedExpenses[category].amount.toFixed(2)),
    color: groupedExpenses[category].color,
    // percentage: parseInt(
    //   getPercentage(groupedExpenses[category].amount, totalAmount).toFixed(0)
    // ),
  }));

  return result;
};
