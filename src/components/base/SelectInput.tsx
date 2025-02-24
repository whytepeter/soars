import React, { useState } from "react";
import { Input } from "./Input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useContainerDimensions from "@/hooks/useContainerDimensions";
import { cn } from "@/lib/utils";

export type SelectInputType = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: string[];
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  error?: string;
};

const SelectInput = React.forwardRef<HTMLInputElement, SelectInputType>(
  ({ options, value, onChange, error, ...props }, ref) => {
    const [open, setOpen] = useState(false);

    const { dimensions, containerRef } =
      useContainerDimensions<HTMLDivElement>();

    const handleSelect = (option: string) => {
      onChange?.({ target: { value: option } });
      setOpen(false);
    };

    return (
      <div ref={containerRef}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div>
              <Input
                className="w-full text-left"
                value={value}
                name={props.name}
                id={props.id}
                readOnly
                disabled={props.disabled}
                error={error}
                ref={ref}
                aria-expanded={open ? "true" : "false"}
                aria-haspopup="listbox"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            style={{
              width: dimensions?.width || "auto",
            }}
            className="max-h-[200px] overflow-y-auto rounded-2xl flex flex-col gap-4"
            align="center"
            role="listbox"
            aria-labelledby={props.id}
            tabIndex={-1}
          >
            {options?.map((option, index) => (
              <div
                key={index}
                id={`option-${index}`}
                role="option"
                aria-selected={option === value ? "true" : "false"}
                onClick={() => handleSelect(option)}
                className={cn(
                  option == value ? "text-secondary" : "text-dark-300",
                  "text-sm  cursor-pointer"
                )}
              >
                {option}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
export default SelectInput;
