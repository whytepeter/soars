import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      sans: ["Open Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        white: "#FFFFFF",
        background: "#F5F7FA",
        outline: "#E6EFF5",
        primary: "#232323",
        secondary: "#396AFF",
        error: "#FF4B4A",
        success: "#41D4A8",
        dark: {
          "100": "#B1B1B1",
          "200": "#718EBF",
          "300": "#343C6A",
          DEFAULT: "#232323",
        },
      },
      spacing: {
        "90": "20rem",
        "96": "24rem",
        "98": "28rem",
        "100": "30rem",
        "128": "32rem",
        easispace: "11rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
