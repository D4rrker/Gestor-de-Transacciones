import { IMainData } from "@/app/types/propsMainDataContext";

export default function LiRecentTransaction({
  obj_transaction,
}: {
  obj_transaction: IMainData;
}) {
  const toLocale = obj_transaction.amount.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const dateTransform = obj_transaction.date.split("-");
  const [year, month, day] = dateTransform;
  const newDate = `${day}-${month}-${year}` || "";

  return (
    <li className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between py-1 rounded-md">
      <div>
        <span className="text-lg font-normal">{newDate}</span> -{" "}
        <span className="text-lg font-semibold">
          {obj_transaction.categories[0].charAt(0).toLocaleUpperCase() +
            obj_transaction.categories[0].slice(1)}
        </span>
      </div>
      <div>
        {obj_transaction.description != "" ? (
          <span>{obj_transaction.description}</span>
        ) : (
          <i className="text-gray-400">Sin descripción</i>
        )}
      </div>
      <div>
        <span
          className={`${
            obj_transaction.isExpense ? "text-red-600" : "text-green-600"
          } text-lg font-normal`}
        >
          {obj_transaction.isExpense ? "-" : "+"}
          {toLocale}€
        </span>
      </div>
    </li>
  );
}
