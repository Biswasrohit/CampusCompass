import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch "Academic Sanctuary" design tokens
        primary: "#494adb",
        "primary-dim": "#3c3ccf",
        "primary-container": "#6265f5",
        "primary-fixed": "#6265f5",
        "primary-fixed-dim": "#5557e7",
        "on-primary": "#fbf7ff",
        "on-primary-container": "#000000",
        "on-primary-fixed": "#ffffff",
        "on-primary-fixed-variant": "#eceaff",

        secondary: "#5d5d72",
        "secondary-dim": "#515166",
        "secondary-container": "#e2e0f9",
        "secondary-fixed": "#e2e0f9",
        "secondary-fixed-dim": "#d4d2eb",
        "on-secondary": "#fbf7ff",
        "on-secondary-container": "#505064",
        "on-secondary-fixed": "#3d3e51",
        "on-secondary-fixed-variant": "#5a5a6f",

        tertiary: "#745479",
        "tertiary-dim": "#67486c",
        "tertiary-container": "#f9d0fc",
        "tertiary-fixed": "#f9d0fc",
        "tertiary-fixed-dim": "#eac2ed",
        "on-tertiary": "#fff7fb",
        "on-tertiary-container": "#624367",
        "on-tertiary-fixed": "#4e3154",
        "on-tertiary-fixed-variant": "#6c4d71",

        error: "#a8364b",
        "error-dim": "#6b0221",
        "error-container": "#f97386",
        "on-error": "#fff7f7",
        "on-error-container": "#6e0523",

        surface: "#fcf8fe",
        "surface-dim": "#dbd8e4",
        "surface-bright": "#fcf8fe",
        "surface-tint": "#494adb",
        "surface-variant": "#e4e1ed",
        "surface-container": "#f0ecf6",
        "surface-container-high": "#eae7f1",
        "surface-container-highest": "#e4e1ed",
        "surface-container-low": "#f6f2fb",
        "surface-container-lowest": "#ffffff",

        "on-surface": "#32323b",
        "on-surface-variant": "#5f5e68",
        background: "#fcf8fe",
        "on-background": "#32323b",

        outline: "#7b7984",
        "outline-variant": "#b3b0bc",

        "inverse-surface": "#0e0e12",
        "inverse-on-surface": "#9e9ca2",
        "inverse-primary": "#8083ff",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Be Vietnam Pro", "system-ui", "sans-serif"],
        label: ["Be Vietnam Pro", "system-ui", "sans-serif"],
        sans: ["Be Vietnam Pro", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-in-left": "slide-in-left 0.3s ease-out forwards",
        "slide-in-bottom": "slide-in-bottom 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
