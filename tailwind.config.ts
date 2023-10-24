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
        primaryColor: '#d8671b',
        secondaryColor: '#1a1a2a',
        whiteColor: '#f5f5f5',
        grayColor: '#9999a0',
      },
    },
  },
  plugins: [],
};
export default config;
