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
      colors: {
        primary: "#2A2D41",
        secondary: "#2A2B40",
      },
      backgroundColor: {
        win: "#2D412A",
        draw: "#545454",
        lose: "#502938",
        upcoming: "#3E4260CC",
        outdated: "#412A39CC",
      },
    },
  },
  plugins: [],
};

export default config;
