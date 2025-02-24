import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityLoader() {
  return (
    <div className="flex items-end justify-evenly gap-4 sm:gap-6 p-4">
      <div className="flex items-end gap-4">
        <Skeleton className="h-[200px] w-5 rounded-full" />
        <Skeleton className="h-[70px] w-5 rounded-full" />
      </div>
      <div className="flex items-end gap-4">
        <Skeleton className="h-[160px] w-5 rounded-full" />
        <Skeleton className="h-[80px] w-5 rounded-full" />
      </div>
      <div className="flex items-end gap-4">
        <Skeleton className="h-[50px] w-5 rounded-full" />
        <Skeleton className="h-[180px] w-5 rounded-full" />
      </div>
      <div className=" items-end gap-4 flex">
        <Skeleton className="h-[80px] w-5 rounded-full" />
        <Skeleton className="h-[160px] w-5 rounded-full" />
      </div>
      <div className=" items-end gap-4 hidden sm:flex">
        <Skeleton className="h-[150px] w-5 rounded-full" />
        <Skeleton className="h-[250px] w-5 rounded-full" />
      </div>
    </div>
  );
}
