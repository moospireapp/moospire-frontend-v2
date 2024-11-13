import type { Config } from "tailwindcss";
import { COLORS } from "./src/app/_assets/theme/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      mdLg: { max: "880px" },
      md: { max: "768px" },
      sm: { max: "639px" },
      xs: { max: "440px" },
    },

    extend: {
      colors: { ...COLORS },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", marginLeft: "-100%" },
          "100%": { opacity: "1", marginLeft: "0" },
        },

        "zoom-in": {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },

        "slide-down": {
          "0%": {
            transform: "translateY(-14%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        "drift-right": {
          from: {
            marginRight: "-50%",
          },
          to: {
            marginRight: "0",
          },
        },

        "drift-left": {
          from: {
            marginLeft: "-50%",
          },
          to: {
            marginLeft: "0",
          },
        },

        "drift-down": {
          from: {
            marginBottom: "-50%",
          },
          to: {
            marginBottom: "0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "zoom-in": "zoom-in 0.5s ease-in-out",
        "slide-down": "slide-down 0.4s ease-in-out",
        "drift-right": "drift-right 0.6s ease-in-out forwards",
        "drift-left": "drift-left 0.4s ease-in-out forwards",
        "drift-down": "drift-down 0.4s ease-in-out forwards",
      },
    },

    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
