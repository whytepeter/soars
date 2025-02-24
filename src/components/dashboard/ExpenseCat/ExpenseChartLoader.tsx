import { Skeleton } from "@/components/ui/skeleton";

export default function ExpenseChartLoader() {
  return (
    <Skeleton className="flex-shrink-0 h-[300px] w-[300px] rounded-full mx-auto" />
  );
}
