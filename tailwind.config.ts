import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    //   fontFamily: {
    //     body: ["var(--font-work-sans"],
    //     heading: ["var(--font-work-sans"],
    //   },
    // },
    spacing: {
      px: "1px",
      0: "0",
      1: "0.5rem",
      2: "1rem",
      3: "1.5rem",
      4: "2rem",
      5: "2.5rem",
      6: "3rem",
      7: "3.5rem",
      8: "4rem",
      9: "4.5rem",
      10: "5rem",
      11: "5.5rem",
      12: "6rem",
      13: "6.5rem",
      14: "7rem",
      15: "7.5rem",
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      md: ["16px", "24px"],
      base: ["18px", "28px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
      "2xl": ["32px", "32px"],
      "3xl": ["40px", "40px"],
      "6xl": ["64px", "60px"],
    },
    letterSpacing: {
      tightest: "-.05em",
      tighter: "-.03em",
      tight: "-.02em",
      normal: "0",
    },
    colors: {
      white: "#ffffff",
      sky: "#11C6FF",
      cobalt: "#003EDB",
      body: "#1C3654",
      heading: "#0C2542",
      bgDark: "#e3ebf2",
      bgMedium: "#f0f4f9",
      bgLight: "#f8fafc",
    },
  },
  plugins: [],
}
export default config
