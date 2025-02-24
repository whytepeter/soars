import { lazy, Suspense } from "react";

import ListCreditCards from "@/components/credit-card/MyCards";
import RecentTransaction from "@/components/transactions/RecentTransaction";
import QuickTransfer from "@/components/dashboard/transfer/QuickTransfer";

import ExpenseChartLoader from "@/components/dashboard/ExpenseCat/ExpenseChartLoader";
import ActivityLoader from "@/components/dashboard/Activity/ActivityLoader";
import BalanceLoader from "@/components/dashboard/BalanceHistory/BalanceLoader";

const BalanceHistory = lazy(
  () => import("@/components/dashboard/BalanceHistory/BalanceHistory")
);
const Activity = lazy(() => import("@/components/dashboard/Activity/Activity"));

const ExpenseStats = lazy(
  () => import("@/components/dashboard/ExpenseCat/ExpenseStats")
);

export default function Dashboard() {
  return (
    <main className="space-y-6 pb-10 ">
      <div className="grid grid-cols-12 gap-6">
        <ListCreditCards className="col-span-12 lg:col-span-7  xl:col-span-8" />
        <RecentTransaction className="col-span-12 lg:col-span-5  xl:col-span-4" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7  xl:col-span-8">
          <Suspense fallback={<ActivityLoader />}>
            <Activity />
          </Suspense>
        </div>
        <div className="col-span-12 lg:col-span-5  xl:col-span-4 ">
          <Suspense fallback={<ExpenseChartLoader />}>
            <ExpenseStats />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <QuickTransfer className="col-span-12   lg:col-span-5" />
        <div className="col-span-12   lg:col-span-7">
          <Suspense fallback={<BalanceLoader />}>
            <BalanceHistory />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
