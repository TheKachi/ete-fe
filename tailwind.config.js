module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './nuxt.config.js',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // white: '#E6E1E7',
      white: '#FFF',
      'footer-black': '#121212',
      black: '#0B1344',
      grey: '#716969',
      tab: '#f2f5f7',
      'light-grey': 'rgba(113, 105, 105, 0.1)',
      'medium-grey': '#ccc',
      blue: '#374EF4',
      dark: '#1A277E',
      // purple: '#7445C7',
      purple: '#5164F6',

      green: '#7445C7',
      coral: '#EF9491',
      lemon: '#DBD599',
      yellow: '#FFBC0D',
    },

    spacing: {
      0: '0px',
      1: '1px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      28: '28px',
      32: '32px',
      36: '36px',
      40: '40px',
      48: '48px',
      52: '52px',
      56: '56px',
      60: '60px',
      64: '64px',
      68: '68px',
      80: '80px',
      90: '90px',
      96: '96px',
      120: '120px',
      144: '144px',
      160: '160px',
      256: '256px',
      300: '300px',
      full: '100%',
    },

    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '40px',
      '4xl': '50px',
      '5xl': '60px',
    },

    // Font weights
    // 300 - font-light
    // 600 - font-semibold
    // 800 - font-extrabold

    extend: {},
  },

  plugins: [],

  // variants: {
  //   backgroundColor: [
  //     "dark-hover",
  //     "dark-group-hover",
  //     "dark-even",
  //     "dark-odd",
  //   ],
  //   borderColor: ["dark-focus", "dark-focus-within"],
  //   textColor: ["dark-hover", "dark-active"],
  // },
}
