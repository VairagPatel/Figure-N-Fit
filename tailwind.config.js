// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: "class", // ✅ add this

  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        brand: {
          50:  '#F7FAF5',
          100: '#E6F4DD',
          200: '#CDE8BB',
          300: '#B0D98E',
          400: '#8CC63E',
          500: '#66A829',
          600: '#4F8521',
          700: '#3B661B',
          800: '#295014',
          900: '#1F3B0F',
        },
      },
      borderRadius: { xl: '1rem', '2xl': '1.25rem' },
      boxShadow: { soft: '0 8px 30px rgba(0,0,0,0.08)' },

      /* 🔽 animations */
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        },
        'wave-pan': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'ring-pulse': { '0%': { transform:'scale(1)', opacity: .9 }, '100%': { transform:'scale(1.35)', opacity: 0 } },
    'blob': {
      '0%,100%': { transform:'translate(0,0) scale(1)' },
      '33%': { transform:'translate(6px,-4px) scale(1.04)' },
      '66%': { transform:'translate(-4px,6px) scale(0.98)' },
    },
    reel: {
      "0%":   { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" }, // move one full strip width
    },
    'eq': {
      '0%,100%': { transform:'scaleY(0.2)' },
      '50%': { transform:'scaleY(1)' }
    },
    'sweep': { '0%': { transform:'rotate(0deg)' }, '100%': { transform:'rotate(360deg)' } },
      },

      animation: {
        'fade-in-down': 'fade-in-down .5s ease-out both',
        'fade-in': 'fade-in .6s ease-out both',
        'slide-down': 'slide-down .35s ease-out both',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        'wave-pan': 'wave-pan 2s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'ring-pulse': 'ring-pulse 1.7s ease-out infinite',
    'blob-slow': 'blob 6s ease-in-out infinite',
    'blob-fast': 'blob 3.5s ease-in-out infinite',
    'eq': 'eq 1.2s ease-in-out infinite',
    'sweep': 'sweep 8s linear infinite',
    "reel-20s": "reel 20s linear infinite",
    "reel-30s": "reel 30s linear infinite",
      },
    },
  },
  plugins: [],
}
