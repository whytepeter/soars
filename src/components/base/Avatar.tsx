import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
  label?: string;
  img?: string;
  alt?: string;
  onClick?: () => void;
}

export default function Avatar({
  className,
  children,
  label,
  img,
  alt = "avatar",
  onClick,
}: Props) {
  const containerStyle = cn(
    "flex-shrink-0 overflow-hidden h-12 w-12 text-dark-300 font-medium text-sm rounded-full flex items-center justify-center  cursor-pointer bg-background",
    className
  );

  return (
    <div aria-label={label || alt} onClick={onClick} className={containerStyle}>
      {img && (
        <img className="w-full  h-full object-cover" src={img} alt={alt} />
      )}
      {label && <span className="sr-only">{label}</span>}
      {children}
    </div>
  );
}
