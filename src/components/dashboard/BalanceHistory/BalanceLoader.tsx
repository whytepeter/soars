import { Skeleton } from "@/components/ui/skeleton";

export default function BalanceLoader() {
  return (
    <div className="p-4">
      <Skeleton className="h-[300px] w-full rounded-[25px]" />
    </div>
  );
}
