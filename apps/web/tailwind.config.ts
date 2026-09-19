import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#15294C',
        'navy-2': '#22406E',
        blue: '#1E88E5',
        'blue-deep': '#1565C0',
        cyan: '#35C2F0',
      },
    },
  },
  plugins: [],
};

export default config;
