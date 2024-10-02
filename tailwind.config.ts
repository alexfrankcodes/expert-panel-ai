import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#2dd4bf",
          hover: "#5eead4",
        },
        secondary: {
          DEFAULT: "#334155",
          hover: "#475569",
        },
        accent: {
          DEFAULT: "#059669",
          hover: "#047857",
        },
        danger: {
          DEFAULT: "#f87171",
          hover: "#fca5a5",
        },
        neutral: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          700: "#334155",
          800: "#1e293b",
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
};

const customClasses = {
  'btn': 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  'btn-primary': 'bg-primary text-white hover:bg-primary-hover',
  'btn-secondary': 'bg-secondary text-white hover:bg-secondary-hover',
  'btn-outline': 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  'btn-ghost': 'hover:bg-accent hover:text-accent-foreground',
  'input-base': 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  'card': 'rounded-lg border bg-card text-card-foreground shadow-sm',
  'card-header': 'flex flex-col space-y-1.5 p-6',
  'card-title': 'text-2xl font-semibold leading-none tracking-tight',
  'card-description': 'text-sm text-muted-foreground',
  'card-content': 'p-6 pt-0',
  'card-footer': 'flex items-center p-6 pt-0',
};

config.theme.extend.customClasses = customClasses;

export default config;
