import type { Config } from 'tailwindcss'
import nextAdminPreset from '@premieroctet/next-admin/preset'

const config: Config = {
  content: [
    "node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}",
    "./lib/next-admin-options.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode via class
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
      darkNextAdmin: {
        background: {
          DEFAULT: "#fafafa", // light gray
          light: "#ffffff",   // white
          hover: "#f3f4f6",   // soft gray for hover
        },
        text: {
          DEFAULT: "#1e293b", // slate-800 for dark readable text
          muted: "#6b7280",   // gray-500
        },
        border: "#e5e7eb",     // gray-200
        menu: {
          background: "#ffffff", // white
          active: "#e0f2fe",     // light blue
          hover: "#f1f5f9",      // blue-gray hover
        },
        card: {
          background: "#ffffff",               // white card
          shadow: "rgba(0, 0, 0, 0.05)"         // lighter shadow
        },
        brand: {
          DEFAULT: "#3b82f6",   // blue-500 (primary accent)
        }
      },
    },
  },
  presets: [nextAdminPreset, require("tailwindcss-animate")],
}

export default config
