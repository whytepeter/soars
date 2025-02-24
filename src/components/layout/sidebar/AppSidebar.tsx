import { useAppDispatch, useAppSelector } from "@/hooks";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toggleSidebar } from "@/store/slices/configSlice";
import AppLogo from "../AppLogo";
// import { SIDEBAR_ITEMS } from "./sidebar";
import SidebarItem from "./SidebarItem";
import { getSidebarItems, routeConfig } from "@/router";

interface Props {
  className?: string;
}

export default function AppSidebar({ className }: Props) {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  const sidebarCollapsed = useAppSelector(
    (state) => state.config.sidebarCollapsed
  );

  const SIDEBAR_ITEMS = getSidebarItems(routeConfig);

  const sidebarClass = cn(
    isMobile && !sidebarCollapsed ? "open" : "",
    "sidebar sidebar-mobile z-40 fixed border-r border-outline left-0 top-0 bg-white min-h-screen transition-all ease-in-out duration-200  overflow-hidden",
    className
  );

  return (
    <>
      <aside className={sidebarClass}>
        <header className="p-4 md:px-6">
          <AppLogo collapsed={sidebarCollapsed} />
        </header>

        <ul
          className={cn(
            "h-full flex flex-col overflow-y-auto overflow-x-hidden gap-2.5 py-4 no-scrollbar"
          )}
        >
          {SIDEBAR_ITEMS?.map((item, index) => (
            <SidebarItem
              item={item}
              collapse={sidebarCollapsed}
              key={`sidebar-item-${index}`}
            />
          ))}
        </ul>
      </aside>
      <div
        onClick={() => dispatch(toggleSidebar())}
        className={`${
          isMobile && !sidebarCollapsed ? "open" : ""
        } sidebar-overlay z-30 fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm`}
      ></div>
    </>
  );
}
