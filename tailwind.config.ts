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
    },
  },
};

export default config;