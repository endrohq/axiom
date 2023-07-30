module.exports = {
  content: ['{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'],
  theme: {
    extend: {
      fontSize: {
        sm: '0.8rem',
        base: '0.9rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
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
