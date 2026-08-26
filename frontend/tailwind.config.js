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
          50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd",
          400: "#a78bfa", 500: "#7c3aed", 600: "#6d28d9", 700: "#5b21b6",
          800: "#4c1d95", 900: "#3b1378",
        },
        gold: { 100: "#faf3dd", 200: "#f0e0b0", 400: "#d4af37", 500: "#c9a227", 600: "#a8861c" },
        pink: { 100: "#fce7f3", 400: "#f472b6", 500: "#ec4899", 600: "#db2777" },
        teal: { 100: "#ccfbf1", 400: "#2dd4bf", 500: "#0d9488", 600: "#0f766e" },
        silver: { 100: "#f4f4f6", 200: "#e5e5ea", 300: "#d4d4dc", 500: "#64748b" },
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
