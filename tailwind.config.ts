import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primaryColor: '#d9480f',
        secondaryColor: '#ffd8a8',
        whiteColor: '#f5f5f5',
        grayColor: '#9999a0',
      },
    },
  },
  plugins: [],
};
export default config;
