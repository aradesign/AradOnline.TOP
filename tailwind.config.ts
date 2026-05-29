import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #006666)",
          light: "var(--color-primary-light, #007777)",
          dark: "var(--color-primary-dark, #004d4d)",
        },
        secondary: {
          blue: "var(--color-accent-blue, #3B82F6)",
          orange: "var(--color-accent-orange, #F97316)",
        },
        slate: {
          dark: "var(--color-text-dark, #1E293B)",
          muted: "var(--color-text-muted, #64748B)",
        },
        section: "var(--color-section-bg, #F7F9FC)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "var(--font-vazirmatn)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 102, 102, 0.08)",
        "card-hover": "0 12px 40px rgba(0, 102, 102, 0.15)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
