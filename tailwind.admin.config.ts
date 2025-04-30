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
  },
  presets: [nextAdminPreset],
}

export default config
