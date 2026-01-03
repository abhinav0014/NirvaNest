/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // controlled via <html class="dark">
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
    },
    extend: {
      /* =========================
         Colors
         ========================= */
      colors: {
        /* Brand */
        primary: {
          DEFAULT: '#1E3A8A',
          50: '#F2F5FF',
          100: '#E6ECFF',
          200: '#BFD0FF',
          300: '#99B4FF',
          400: '#4D7BFF',
          500: '#1E3A8A',
          600: '#162A67',
          700: '#0F1D46',
          800: '#0A132E',
          900: '#050715',
        },

        accent: {
          DEFAULT: '#3B82F6',
          50: '#F0F7FF',
          100: '#E6F0FF',
          200: '#BFDEFF',
        },

        /* Status */
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#2563EB',

        /* Neutral scale */
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        /* Semantic UI tokens */
        background: '#F9FAFB',
        surface: '#FFFFFF',
        border: '#E5E7EB',
        text: '#111827',
        muted: '#6B7280',

        /* Dark mode tokens */
        dark: {
          background: '#0B1220',
          surface: '#111827',
          border: '#1F2937',
          text: '#E5E7EB',
          muted: '#9CA3AF',
        },
      },

      /* =========================
         Typography
         ========================= */
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      /* =========================
         Radius & Shadow
         ========================= */
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
      },

      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.06)',
        soft: '0 2px 8px rgba(0,0,0,0.04)',
      },

      /* =========================
         Screens (All devices)
         ========================= */
      screens: {
        xs: '420px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      /* =========================
         Animations (Subtle only)
         ========================= */
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
