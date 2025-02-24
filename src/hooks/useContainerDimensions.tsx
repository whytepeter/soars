import { useState, useEffect, useRef } from "react";

const useContainerDimensions = <T extends HTMLElement>() => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        const { width, height } = entries[0].contentRect;

        // Using requestAnimationFrame to ensure optimal performance during frequent resizes
        requestAnimationFrame(() => {
          setDimensions({ width, height });
        });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { dimensions, containerRef } as const; // Return as a tuple for type inference
};

export default useContainerDimensions;
