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
        darkNextadmin: {
          background: {
            DEFAULT: "#052e16",
            light: "#064e3b",
            hover: "#065f46",
          },
          text: {
            DEFAULT: "#d1fae5",
            muted: "#6ee7b7",
          },
          border: "#047857",
          menu: {
            background: "#052e16",
            active: "#047857",
            hover: "#065f46",
          },
          card: {
            background: "#064e3b",
            shadow: "rgba(0, 0, 0, 0.1)"
          },
          brand: {
            DEFAULT: "#047857",
          }
        },
      },
    },
  },
  presets: [nextAdminPreset],
}

export default config
