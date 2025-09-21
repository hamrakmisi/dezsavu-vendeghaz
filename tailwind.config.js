/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/preview.js",
    "./src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
      },
    },
  },
  plugins: [
    require("rippleui")({
      themes: [
        {
          themeName: "light",
          colorScheme: "light",
        },
        {
          themeName: "dark",
          colorScheme: "dark",
        },
      ],
    }),
  ],
};