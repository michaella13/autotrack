/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.js','./src/**/*.jsx'],
  theme: {
    extend: {
      colors:{
        primary:'#D0A572',
        secondary:'#060B05',
        sub:'#EFEFED',
        error:'#A60101'
      },
      
    },
    fontFamily:{
      sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    }
  },
  plugins: [],
}

