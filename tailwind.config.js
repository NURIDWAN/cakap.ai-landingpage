/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        "on-primary": "#ffffff",
        ink: "#141414",
        "ink-soft": "#262626",
        "text-muted": "#707070",
        "text-faint": "#adadad",
        canvas: "#ffffff",
        "canvas-soft": "#f3f3f3",
        field: "#f0f0f0",
        "hairline-soft": "#f0f0f0",
        hairline: "#e0e0e0",
        accent: "#0066ff",
      },
      borderRadius: {
        sm: "16px",
        md: "24px",
        squircle: "30%",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "80px",
        "section-lg": "120px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
