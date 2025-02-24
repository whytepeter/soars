import React, { useState } from "react";
import ArrowIcon from "@/assets/icon/arrow.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

import { Input, InputType } from "./Input";
import { formatDate } from "@/lib/utils";

export type DateInputType = InputType & {
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputType>(
  ({ type, value = "", onChange, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>(value);

    const handleDateChange = (date?: Date) => {
      const formattedDate = date ? formatDate(date, "YYYY-MM-DD") : "";
      setSelectedDate(formattedDate);
      onChange?.({ target: { value: formattedDate } });
      setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedDate(e.target.value);
      onChange?.(e);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            ref={ref}
            type="text"
            {...props}
            value={value}
            appendClick={() => setOpen(true)}
            onChange={handleInputChange}
            append={<img src={ArrowIcon} />}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={(date) => handleDateChange(date)}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;
