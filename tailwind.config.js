/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'senthia': {
          50: '#66b296',
          100: '#007F51',
          200: '#006540',
        },
        'orange_senthia': {
          100: '#D85341'
        },
        'gray_senthia': '#F1F3F6'
      },
    },
  },
  plugins: [],
}

