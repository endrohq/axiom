module.exports = {
  content: [
    '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
  ],
  theme: {
    extend: {
      minWidth: {
        360: '360px',
        'screen-xs': '480px',
        'screen-sm': '576px',
        'screen-md': '768px',
        'screen-lg': '992px',
        'screen-xl': '1200px',
        'screen-xxl': '1600px',
      },
      backgroundColor: {
        primary: '#9f5ffe',
      },
      borderColor: {
        primary: '#9f5ffe',
      },
      colors: {
        primary: '#9f5ffe',
      },
    },
  },
  plugins: [],
};
