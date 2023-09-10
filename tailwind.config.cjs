/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/applet-shell/dist/*.{js,jsx,ts,tsx,mjs}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('applet-design-utility')
  ]
}
