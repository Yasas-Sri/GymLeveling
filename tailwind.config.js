/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       colors:{
           primary:'#0A0A2C',
           secondary:'#FF7E06',
       }
    },
  },
  plugins: [],
}

