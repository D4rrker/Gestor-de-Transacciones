import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "main-col": "minmax(400px, 1fr) minmax(400px, 1.5fr) ",
        "main-col-1": "minmax(300px, 1fr) ",
        "main-col-2": "minmax(300px, 1.5fr) ",
        "main-col-responsive": "1fr",
        "ul-transactions":
          "minmax(100px ,1fr) minmax(150px, 1fr) minmax(200px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr)",
      },
      gridTemplateRows: {
        "main-row-1": "200px 450px 150px",
        "main-row-2": "350px 300px 150px",
        "main-row-2-res": "1fr 1fr 150px",
      },
    },
  },
  plugins: [],
};
export default config;
