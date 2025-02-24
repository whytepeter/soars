import { cn } from "@/lib/utils";

export type PaginationType = {
  currentPage: number;
  pageSize: number;
  totalPage: number;
};

type Props = {
  pagination?: PaginationType;
  loading?: boolean;
  hideInfo?: boolean;
  className?: string;
  nextClick?: () => void;
  prevClick?: () => void;
};

export default function Pagination({
  pagination = {
    currentPage: 0,
    totalPage: 0,
    pageSize: 10,
  },
  prevClick,
  nextClick,
  loading = false,
  hideInfo = false,
  className,
}: Props) {
  const { currentPage, totalPage } = pagination;
  const hasNext = totalPage > currentPage;
  const hasPrev = currentPage > 1;

  const styles = cn(
    "flex items-center justify-center ",
    loading ? "cursor-not-allowed opacity-50 pointer-events-none" : "",
    className
  );

  const buttonStyles =
    "flex items-center gap-1 justify-center rounded-xl p-2 text-sm bg-white dark:bg-accent-800 border border-secondary-200 dark:border-accent-600";

  return (
    <div className="flex items-center justify-center md:justify-between">
      {!hideInfo && (
        <div className="flex items-center gap-2 text-sm">
          <div className="hidden md:block text-left md:my-4 text-dark-200">
            {/* Showing */}
            <span className="ml-1 text-sm">
              {currentPage} of {totalPage}
            </span>
          </div>
        </div>
      )}
      <div className={styles}>
        <div className="flex gap-4 items-center">
          <div
            onClick={prevClick}
            className={`${buttonStyles} ${
              hasPrev
                ? "cursor-pointer"
                : "cursor-not-allowed  opacity-50 pointer-events-none"
            }
            `}
          >
            <i className="pi pi-chevron-left text-xs"></i>
            Back
          </div>
          <div
            onClick={nextClick}
            className={`${buttonStyles}${
              hasNext
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50 pointer-events-none"
            }`}
          >
            Next
            <i className="pi pi-chevron-right text-xs text-neutral-600"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
