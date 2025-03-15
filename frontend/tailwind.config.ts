import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This covers all nested files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
