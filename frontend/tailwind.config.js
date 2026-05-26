/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backdropBlur: {
        '3xl': '64px',
      },
      colors: {
        midnight: '#070911',
        amber: { DEFAULT: '#FBBF24' },
        cyan: { DEFAULT: '#06B6D4' },
      },
    },
  },
  plugins: [],
}
