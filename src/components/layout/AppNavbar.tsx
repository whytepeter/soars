import { useAppDispatch } from "@/hooks";
import { toggleSidebar } from "@/store/slices/configSlice";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/type";
import { useMemo } from "react";

import Hamburger from "@/assets/icon/hamburger.svg";
import Setting from "@/assets/icon/settings-2.svg";
import Notification from "@/assets/icon/notification.svg";

import Heading from "@/components/typography/Heading";
import { Button } from "@/components/base/Button";
import Search from "@/components/base/Search";
import Avatar from "@/components/base/Avatar";
import UserProfile from "../settings/UserProfle";

interface Props {
  className?: string;
}

export default function AppNavbar({ className }: Props) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = useMemo(() => {
    const basePath = location.pathname.split("/")[1];

    if (basePath === "") {
      return "Overview";
    }

    // Map the base path to the corresponding route dynamically
    return (
      Object.keys(ROUTES).find((key) =>
        ROUTES[key as keyof typeof ROUTES].includes(basePath)
      ) || "Dashboard"
    );
  }, [location.pathname]);

  const navbarClass = cn(
    "sticky !bg-white/80 backdrop-blur-md md:border-b border-outline left-0 top-0 w-full z-20 bg-white  p-4 md:px-6 flex flex-col gap-4",
    className
  );

  return (
    <nav className={navbarClass}>
      <div className="flex gap-4  items-center justify-between">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => dispatch(toggleSidebar())}
          className="flex md:hidden"
        >
          <img src={Hamburger} alt="Menu" />
        </Button>
        <Heading className="text-lg md:text-xl">{currentPage}</Heading>

        <div className="flex items-center gap-4 ">
          <div className="hidden md:flex items-center gap-4 ">
            <Search />

            <Avatar onClick={() => navigate(ROUTES.Settings)}>
              <img src={Setting} alt="Settings" loading="lazy" />
            </Avatar>
            <Avatar>
              <img src={Notification} alt="notification" />
            </Avatar>
          </div>

          <UserProfile
            onClick={() => navigate(ROUTES.Settings)}
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="md:hidden  ">
        <Search />
      </div>
    </nav>
  );
}
