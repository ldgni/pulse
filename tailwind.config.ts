import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        win: "#2C4B1ACC",
        draw: "#4B391ACC",
        lose: "#4B1A2CCC",
        upcoming: "#1A454BCC",
      },
    },
  },
  plugins: [],
};

export default config;
