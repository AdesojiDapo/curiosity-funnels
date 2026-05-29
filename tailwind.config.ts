import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0e14",
        paper: "#f3efe7",
        amber: { DEFAULT: "#e8a44a", soft: "#f3c98e", deep: "#d4a857" },
        sage: "#84b59f",
        cream: "#fbf8f2",
        deepink: "#15140f"
      },
      fontFamily: {
        serif: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"]
      },
      maxWidth: { phone: "26rem" }
    }
  },
  plugins: []
};
export default config;
