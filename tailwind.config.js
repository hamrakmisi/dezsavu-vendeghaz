/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  safelist: [
    { pattern: /^(btn|card|link|badge|input|modal|dropdown|toast)(-.+)?$/ },
  ],
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
          colors: {
            primary: "#F0A202",
          },
        },
      ],
    }),
  ],
};