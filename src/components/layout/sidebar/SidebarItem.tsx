import { useAppDispatch } from "@/hooks";
import { toggleSidebar } from "@/store/slices/configSlice";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SideBarItem } from "@/router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  item: SideBarItem;
  collapse?: boolean;
}

export default function SidebarItem({ collapse, item }: Props) {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const { name, path, redirect, meta } = item;
  const location = useLocation();

  const isActive =
    path === "/"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const closeMobileSidebar = () => {
    if (isMobile) dispatch(toggleSidebar());
  };

  return (
    <Link
      to={redirect || path}
      onClick={closeMobileSidebar}
      className={cn(
        " relative flex items-center gap-4  px-6 py-2 text-sm  duration-500",
        isActive ? "text-primary" : "text-dark-100"
      )}
    >
      {isActive && (
        <div className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-1 h-full rounded-r-md bg-primary"></div>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn("flex-shrink-0", collapse && "mx-auto")}>
            {meta?.icon?.(isActive ? "#232323" : "#B1B1B1")}
          </span>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>

      {!collapse && <span>{name}</span>}
    </Link>
  );
}
