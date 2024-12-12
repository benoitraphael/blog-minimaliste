/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#2a2a2a',
            h1: {
              fontWeight: 'normal',
            },
            h2: {
              fontWeight: 'normal',
            },
            h3: {
              fontWeight: 'normal',
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}