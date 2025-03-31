// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Adjusted for Vite's typical structure
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            blue: '#0056D2',
            gold: '#E5C100',
            white: '#F5F5F5',
            gray: '#2D2D2D',
          },
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  } 