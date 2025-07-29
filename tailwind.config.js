export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      fontSize: {
        // Custom responsive font sizes
        "responsive-xs": ["0.75rem", { lineHeight: "1rem" }],
        "responsive-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "responsive-base": ["1rem", { lineHeight: "1.5rem" }],
        "responsive-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "responsive-xl": ["1.25rem", { lineHeight: "1.75rem" }],
        "responsive-2xl": ["1.5rem", { lineHeight: "2rem" }],
        "responsive-3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "responsive-4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "responsive-5xl": ["3rem", { lineHeight: "1" }],
        "responsive-6xl": ["3.75rem", { lineHeight: "1" }],
        "responsive-7xl": ["4.5rem", { lineHeight: "1" }],
        "responsive-8xl": ["6rem", { lineHeight: "1" }],
        "responsive-9xl": ["8rem", { lineHeight: "1" }],
      },
      lineHeight: {
        tighter: "1.1",
        "super-tight": "0.9",
      },
    },
  },
  plugins: [],
};
