import { useState, useEffect } from "react";

// Define the breakpoints with their corresponding pixel values
const breakpoints: { [key: string]: number } = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// Define the return type for the hook
type Breakpoint = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
};

export function useBreakpoint(): Breakpoint {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Function to handle resize
  const handleResize = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    // Only add event listener on the client side
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Return the object with booleans for each breakpoint
  return {
    xs: windowWidth <= breakpoints.sm,
    sm: windowWidth <= breakpoints.sm,
    md: windowWidth <= breakpoints.md,
    lg: windowWidth <= breakpoints.lg,
    xl: windowWidth <= breakpoints.xl,
  };
}
