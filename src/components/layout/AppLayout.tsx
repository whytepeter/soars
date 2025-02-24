import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { setSidebarState } from "@/store/slices/configSlice";

import AppSidebar from "./sidebar/AppSidebar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import AppNavbar from "./AppNavbar";
import ErrorBoundary from "../base/ErrorBoundary";

import { PrimeReactProvider } from "primereact/api";

export default function AppLayout() {
  const dispatch = useAppDispatch();

  const sidebarCollapsed = useAppSelector(
    (state) => state.config.sidebarCollapsed
  );
  const { xl: isMedium } = useBreakpoint();

  useEffect(() => {
    dispatch(setSidebarState(isMedium));
  }, [isMedium]);

  return (
    <ErrorBoundary>
      <PrimeReactProvider>
        <main
          className={`${
            sidebarCollapsed ? "collapsed" : ""
          } admin-layout bg-white md:bg-background z-30 transition-all ease-in-out duration-200 min-h-screen relative`}
        >
          <AppSidebar />
          <div className="relative min-h-screen">
            <AppNavbar />
            <div className="w-full p-4 sm:px-8 sm:py-6">
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </main>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: 14,
            },
          }}
        />
      </PrimeReactProvider>
    </ErrorBoundary>
  );
}
