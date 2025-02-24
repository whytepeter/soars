import { useRef, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  func: T | undefined,
  delay: number = 300
): T {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(
    ((...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func && func(...args);
      }, delay);
    }) as T,
    [func, delay]
  );

  return debouncedFunction;
}
