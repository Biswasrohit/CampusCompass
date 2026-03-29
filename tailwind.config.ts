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
        // Warm Civic palette — editorial, grounded, trustworthy
        primary: "#2A5C45",
        "primary-dim": "#234E3A",
        "primary-container": "#C4DDD2",
        "primary-fixed": "#D0E8DE",
        "primary-fixed-dim": "#B8D5C8",
        "on-primary": "#FFFFFF",
        "on-primary-container": "#0D2E1E",
        "on-primary-fixed": "#0D2E1E",
        "on-primary-fixed-variant": "#1A4030",

        secondary: "#5C5652",
        "secondary-dim": "#4E4A47",
        "secondary-container": "#E8E3DE",
        "secondary-fixed": "#E8E3DE",
        "secondary-fixed-dim": "#DAD5CF",
        "on-secondary": "#FFFFFF",
        "on-secondary-container": "#3A3632",
        "on-secondary-fixed": "#3A3632",
        "on-secondary-fixed-variant": "#524E4A",

        tertiary: "#7A5050",
        "tertiary-dim": "#6B4343",
        "tertiary-container": "#F5D8D8",
        "tertiary-fixed": "#F5D8D8",
        "tertiary-fixed-dim": "#EDCACA",
        "on-tertiary": "#FFFFFF",
        "on-tertiary-container": "#3D1414",
        "on-tertiary-fixed": "#3D1414",
        "on-tertiary-fixed-variant": "#6B3232",

        error: "#8E3043",
        "error-dim": "#6B0C2A",
        "error-container": "#F5C0CC",
        "on-error": "#FFFFFF",
        "on-error-container": "#4A0018",

        surface: "#FEFCF8",
        "surface-dim": "#DDD8D2",
        "surface-bright": "#FEFCF8",
        "surface-tint": "#2A5C45",
        "surface-variant": "#D8D3CC",
        "surface-container": "#EDE8E0",
        "surface-container-high": "#E5E0D8",
        "surface-container-highest": "#DDD8D2",
        "surface-container-low": "#F4EFE7",
        "surface-container-lowest": "#FFFFFF",

        "on-surface": "#1C1917",
        "on-surface-variant": "#5C5652",
        background: "#F5F0E8",
        "on-background": "#1C1917",

        outline: "#8A847C",
        "outline-variant": "#C8C3BB",

        "inverse-surface": "#1C1917",
        "inverse-on-surface": "#F5F0E8",
        "inverse-primary": "#7BC4A4",
      },
      fontFamily: {
        headline: ["var(--font-headline)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        label: ["var(--font-body)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        josefin: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(28,25,23,0.06), 0 4px 12px rgba(28,25,23,0.04)",
        "card-hover": "0 4px 16px rgba(28,25,23,0.10), 0 1px 4px rgba(28,25,23,0.06)",
        "panel": "0 0 0 1px rgba(28,25,23,0.06), 0 8px 32px rgba(28,25,23,0.08)",
        "button": "0 1px 2px rgba(28,25,23,0.10), 0 2px 8px rgba(42,92,69,0.20)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
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
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-in-left": "slide-in-left 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
        "slide-in-bottom": "slide-in-bottom 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16,1,0.3,1) forwards",
      },
    },
  },
  plugins: [],
};
export default config;
