import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(at center, #274271, #1A2C4B)",
      },
      colors: {
        primary: "#1A2C4B",
        secondary: "#274271",
      },
      backgroundColor: {
        win: "#2C4B1A",
        draw: "#4B391A",
        lose: "#4B1A2C",
        upcoming: "#1A454B",
      },
    },
  },
  plugins: [],
};

export default config;
