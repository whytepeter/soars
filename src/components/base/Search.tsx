import SearchIcon from "@/assets/icon/search.svg";
import { Input, InputType } from "./Input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

type Props = InputType & {
  debounce?: boolean;
  debounceTimer?: number;
};

export default function Search({
  debounce = true,
  debounceTimer = 300,
  placeholder = "Search for something",
  onChange,
  className,
  value,
  ...props
}: Props) {
  const [searchQuery, setSearchQuery] = useState(value);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const debouncedOnChange = useDebounce(onChange, debounceTimer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    return debounce ? debouncedOnChange(e) : onChange?.(e);
  };

  return (
    <>
      <Input
        value={searchQuery}
        onChange={handleChange}
        prepend={<img src={SearchIcon} />}
        className={cn("bg-background rounded-full px-6", className)}
        placeholder={placeholder}
        inputMode="search"
        {...props}
      />
    </>
  );
}
