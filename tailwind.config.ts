import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070707",
          900: "#0c0c0c",
          800: "#141414",
          700: "#1c1c1c",
          600: "#2a2a2a",
        },
        gold: {
          50: "#fbf6e8",
          100: "#f3e6c3",
          200: "#e8d08a",
          300: "#d4af37",
          400: "#c9a227",
          500: "#b8891a",
          600: "#8f6814",
        },
        crimson: {
          400: "#e23b3b",
          500: "#c41e3a",
          600: "#9b1630",
        },
        parchment: "#f4f0e6",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      backgroundImage: {
        "hero-fade":
          "linear-gradient(180deg, rgba(7,7,7,0.25) 0%, rgba(7,7,7,0.55) 45%, rgba(7,7,7,0.95) 100%)",
        carbon:
          "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.08) 1px, transparent 0)",
      },
      boxShadow: {
        gold: "0 0 40px rgba(212,175,55,0.25)",
        "gold-sm": "0 0 18px rgba(212,175,55,0.35)",
      },
      keyframes: {
        "ride-across": {
          "0%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(130%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(212,175,55,0)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.12) translate(-1.5%, -1%)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "ride-across": "ride-across 9s linear infinite",
        shimmer: "shimmer 3.5s linear infinite",
        float: "float 5s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2.4s ease-out infinite",
        kenburns: "kenburns 22s ease-out forwards",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
