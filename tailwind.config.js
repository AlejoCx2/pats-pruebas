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
        'purple_senthia': {
          25: '#ede9f0',
          50: '#dcd4e2',
          75: '#85699a',
          100: '#522970',
          200: '#371C4A',
        },
        'green_senthia': {
          100: '#93D50A'
        },
        'orange_senthia': {
          100: '#D85341'
        },
        'gray_senthia': '#F1F3F6'
      },
      fontFamily: {
        'sans': ['Gilroy', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

