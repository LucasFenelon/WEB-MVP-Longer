/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sf-pro': ['SF Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        'primary-white': '#FFFFFF',
        'secondary-gray': '#F3F3F3',
        'tertiary-gray': '#F5F5F5',
        'dark-background': '#1E1E1E',
      },
      maxWidth: {
        'iphone': '402px',
      },
      height: {
        'screen-ios': '874px',
      },
      spacing: {
        '4.3': '4.3px',
        '17.2': '17.2px',
      },
      borderRadius: {
        '4.3': '4.3px',
      },
    },
  },
  plugins: [],
} 