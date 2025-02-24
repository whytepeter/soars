import Logo from "@/assets/icon/logo.svg";
import { cn } from "@/lib/utils";

interface Props {
  collapsed?: boolean;
}

export default function AppLogo({ collapsed }: Props) {
  return (
    <div className="flex items-center gap-4 ">
      <span className={cn("flex-shrink-0", collapsed && "mx-auto")}>
        <img src={Logo} alt="Soar Task" />
      </span>
      {!collapsed && (
        <h2 className="whitespace-nowrap font-bold text-xl text-dark-300">
          Soar Task
        </h2>
      )}
    </div>
  );
}
