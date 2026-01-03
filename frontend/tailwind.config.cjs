/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
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
        success: {
          DEFAULT: '#10B981',
        },
        warning: {
          DEFAULT: '#F59E0B',
        },
        danger: {
          DEFAULT: '#EF4444',
        },
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
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '4rem',
        },
      },
      boxShadow: {
        card: '0 6px 18px rgba(16,24,40,0.06)'
      }
    },
  },
  plugins: [],
}
