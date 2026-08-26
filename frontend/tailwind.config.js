/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        terracotta: {
          50: "#faf1ec", 100: "#f0dccf", 200: "#e0b89f", 300: "#d09570",
          400: "#c48156", 500: "#b76e4b", 600: "#9c5a3b", 700: "#7c4830",
          800: "#5c3623", 900: "#3c2417",
        },
        cream: { 50: "#faf7f2", 100: "#f2ece1", 200: "#e6d9c3" },
      },
      borderRadius: {
        lg: 'var(--radius)', md: 'calc(var(--radius))', sm: 'calc(var(--radius))'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
