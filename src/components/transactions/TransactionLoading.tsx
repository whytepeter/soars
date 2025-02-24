import { Skeleton } from "@/components/ui/skeleton";

export function TransactionLoading() {
  return (
    <div className="flex items-center space-x-4 px-4 py-2">
      <Skeleton className="flex-shrink-0 h-14 w-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
