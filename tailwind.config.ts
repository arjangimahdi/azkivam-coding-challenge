/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './layers/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'loading-pulse': 'loading-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '.5',
          },
        },
        'loading-pulse': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.6',
            transform: 'scale(0.98)',
          },
        },
      },
    },
  },
  plugins: [],
}
