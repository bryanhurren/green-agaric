/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'forest-dark': '#2C5530',
        'forest-base': '#3D7C47',
        'forest-light': '#5A9B62',
        'earth-dark': '#4A4238',
        'earth-base': '#6B5D52',
        'moss': '#7B8D5C',
      },
    },
  },
  plugins: [],
};
