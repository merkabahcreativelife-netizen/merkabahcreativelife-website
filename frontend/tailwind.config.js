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
          50: "#fbf3ef", 100: "#f5e2d8", 200: "#e8bfa9", 300: "#d69374",
          400: "#cd6440", 500: "#c24b2a", 600: "#a63e22", 700: "#8a3419",
          800: "#6f2b16", 900: "#592313",
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
