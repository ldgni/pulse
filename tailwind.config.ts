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
      backgroundColor: {
        primary: "#151e2d",
        secondary: "#1a2434",
      },
      colors: {
        primary: "#fafafa",
        secondary: "#a1a1aa",
      },
    },
  },
  plugins: [],
};

export default config;
