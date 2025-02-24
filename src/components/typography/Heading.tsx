import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
}
export default function Heading({ children, className }: Props) {
  const headingStyle = cn(
    "font-semibold text-base md:text-lg text-dark-300",
    className
  );
  return <h2 className={headingStyle}>{children}</h2>;
}
