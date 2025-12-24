/*****************
 Tailwind Config - Fintech Dark Theme
*****************/
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0d0f14',
        panel: '#131722',
        primary: '#00d09c',
        secondary: '#2c2f36',
        accent: '#6c5ce7',
        bullish: '#00d09c',
        bearish: '#ff4d4f',
        muted: '#98a2b3'
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
