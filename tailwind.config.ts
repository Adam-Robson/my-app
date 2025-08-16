import { type Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out forwards',
      },
      colors: {
        // neutrals
        eerie: 'var(--eerie)',
        space: 'var(--space)',
        slate: 'var(--slate)',
        platinum: 'var(--platinum)',
        'baby-powder': 'var(--baby-powder)',
        white: 'var(--white)',

        // palette
        honeydew: 'var(--honeydew)',
        beige: 'var(--beige)',
        chiffon: 'var(--chiffon)',
        peach: 'var(--peach)',
        buff: 'var(--buff)',

        // semantic tokens
        background: 'var(--background)',
        tile: 'var(--tile)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        button: 'var(--button)',
        complement: 'var(--complement)',
        accent: 'var(--accent)',
      },

      // tailwind will set gradient backgrounds from var()
      backgroundImage: {
        canvas: 'var(--canvas)',
      },

      fontFamily: {
        // route tailwind font utilities
        sans: ['var(--monda)'],
      },

      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
