import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface InputType extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  prependClick?: () => void;
  appendClick?: () => void;
  currency?: boolean;
  currencySign?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputType>(
  (
    {
      className,
      type,
      error,
      prepend,
      prependClick,
      append,
      appendClick,
      onFocus,
      onBlur,
      currency = false,
      onChange,
      value,
      name,
      currencySign = "$",
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false);

    const containerStyle = cn(
      focus
        ? " border-primary ring-1 ring-primary/20"
        : "border border-outline",
      props.disabled && "cursor-not-allowed opacity-50",
      error && "border-error ring-error/20",
      "h-[50px] relative border bg-white px-4  rounded-xl  flex gap-2 items-center",
      className
    );

    const inputStyles = cn(
      props?.disabled && "cursor-not-allowed opacity-50",
      "flex-1 appearance-none placeholder:text-dark-200 text-dark-200  h-full focus:outline-none block appearance-none bg-transparent text-base md:text-sm disabled:cursor-not-allowed"
    );

    // Memoize the computed display value for currency format
    const computeValue = React.useMemo(() => {
      if (!currency) return value;

      // Remove all non-numeric characters except for decimal points
      let strValue = String(value);
      const parsedValue = parseFloat(strValue.replace(/[^0-9.]/g, ""));
      strValue = parsedValue.toLocaleString();

      return !isNaN(parsedValue) ? `${currencySign}${strValue}` : "";
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (!currency) return onChange && onChange(e);

      // Remove non-numeric characters, preserving only numbers and decimals
      let val = e.target.value.replace(/[^0-9.]/g, "");

      // Remove any leading "$" symbols
      if (val.charAt(0) === currencySign) val = val.substring(1);

      // Remove commas from the value
      val = val.split(",").join("");

      // Trigger onChange with sanitized value
      onChange?.({
        target: { value: val, name },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div>
        <div className={containerStyle}>
          {/* Prepend element with optional click handler */}
          {prepend && (
            <div
              onClick={prependClick}
              className=" flex-shrink-0 text-sm flex items-center text-secondary-600 cursor-pointer"
            >
              {prepend}
            </div>
          )}
          <input
            onFocus={(e) => {
              onFocus && onFocus(e);
              setFocus(true);
            }}
            onBlur={(e) => {
              onBlur && onBlur(e);
              setFocus(false);
            }}
            type={type}
            className={inputStyles}
            ref={ref}
            value={computeValue}
            onChange={handleChange}
            {...props}
          />

          {/* Append element with optional click handler */}
          {append && (
            <div
              onClick={appendClick}
              className="flex-shrink-0 text-sm flex items-center text-secondary-600 cursor-pointer"
            >
              {append}
            </div>
          )}
        </div>
        {/* Hint or error message below the input field */}
        <div className="text-xs font-light mt-1 ml-1">
          {error && <span className="text-error">{error}</span>}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
