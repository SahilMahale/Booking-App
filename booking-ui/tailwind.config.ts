import type { Config } from 'tailwindcss'
//const withMT = require("@material-tailwind/react/utils/withMT");
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
} satisfies Config

//const wihtMaterialTailwind = withMT(myConfig)
export default myConfig
