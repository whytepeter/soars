import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-dark-300/10 dark:bg-dark-100/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
