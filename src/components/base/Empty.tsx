"use client";
import { cn } from "@/lib/utils";
import React from "react";

type PropTypes = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  caption?: string;
};

export default function Empty({
  title = "Oops",
  caption = "Nothing here",
  className,
  children,
}: PropTypes) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 py-12  bg-white  rounded-2xl ",
        className
      )}
    >
      <h3 className="text-base sm:text-xl text-secondary-600 dark:text-accent-50  font-medium">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-secondary-700 dark:text-accent-100 mb-1 font-light">
        {caption}
      </p>
      {children}
    </div>
  );
}
