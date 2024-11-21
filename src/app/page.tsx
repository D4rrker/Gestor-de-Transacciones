import TotalBalance from "./components/dashboard/total-balance/TotalBalance";
import RecentTransactions from "./components/dashboard/recent-transactions/RecentTransactions";
import ExpenseBalance from "./components/dashboard/expense-balance/ExpenseBalance";
import CategoryAllocation from "./components/dashboard/category-allocation/CategoryAllocation";
import Notification from "./components/dashboard/notification/Notification";
import Savings from "./components/dashboard/savings/Savings";

export default function Home() {
  return (
    <div className="w-full h-full grid grid-cols-main-col-responsive xl:place-content-center overflow-y-auto xl:overflow-hidden xl:grid-cols-main-col gap-6">
      <section className="grid grid-cols-main-col-1 grid-rows-main-row-1 gap-6">
        <article className="bg-white border-gray-200 border rounded-lg overflow-hidden shadow-md">
          <TotalBalance />
        </article>
        <article className="bg-white border-gray-200 border rounded-lg overflow-hidden shadow-md">
          <ExpenseBalance />
        </article>
        <article className="bg-white border-gray-200 border rounded-lg overflow-hidden shadow-md">
          <Notification />
        </article>
      </section>
      <section className="grid grid-cols-main-col-2 grid-rows-main-row-2-res lg:grid-rows-main-row-2 gap-6">
        <article className="bg-white border-gray-200 border rounded-lg overflow-hidden shadow-md">
          <RecentTransactions />
        </article>
        <article className="bg-white border-gray-200 border rounded-lg overflow-hidden shadow-md">
          <CategoryAllocation />
        </article>
        <article className="bg-white h-52 md:h-auto border-gray-200 border rounded-lg overflow-hidden shadow-md">
          <Savings />
        </article>
      </section>
    </div>
  );
}
