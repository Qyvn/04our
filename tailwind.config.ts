import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0C",
        bone: "#F2EFE8",
        signal: "#E4002B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Arial Narrow", "sans-serif"],
        ui: ["var(--font-ui)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
