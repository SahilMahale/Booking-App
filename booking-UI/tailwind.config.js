/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const myConfig = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    fontFamily: {
      'sans': ['Oswald', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue',],
    },
    extend: {},
  },
  plugins: [],
}

const wihtMaterialTailwind = withMT(myConfig)
export default myConfig
