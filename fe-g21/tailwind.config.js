/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderWidth: {
      '1': '1px',
      '0': '0',
      '2': '2px',
      '1.5': '1.5px'

    },
    extend: {
      spacing: {
        '1/5': '20%',
        '1/2.5': '40%'
      },
      inset: {
        '1/5': '20%',
      },
      flexGrow: {
        2: '2',
        3: '3',
      }
    },

  },
  plugins: [],
};
