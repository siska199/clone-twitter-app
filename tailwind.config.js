module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens :{
        sm :"576px",
        md :"768px",
        lg :"992px",
        xl:"1200px"
      }
    },
  },
  plugins: [],
}
