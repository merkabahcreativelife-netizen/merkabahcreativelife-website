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
        ink: { DEFAULT: "#201812", soft: "#4d4238", mute: "#877966" },
        terracotta: {
          50: "#fdf1ea", 100: "#fbdfcc", 200: "#f6b795", 300: "#f08a5c",
          400: "#f26230", 500: "#ef4e1f", 600: "#d63f12", 700: "#b03410",
          800: "#8c2a0f", 900: "#6e220d",
        },
        marigold: { 300: "#f9cd6a", 400: "#f5b83d", 500: "#f0a520", 600: "#d18c0d" },
        leaf: { 400: "#5fb97a", 500: "#3da05f", 600: "#2f8050" },
        cream: { 50: "#faf5ec", 100: "#f3ead9", 200: "#e7d8bd", 300: "#d9c5a0" },
      },
      borderRadius: {
        lg: 'var(--radius)', md: 'calc(var(--radius))', sm: 'calc(var(--radius))'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
