/** @type {import('tailwindcss').Config} */

const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const aspectRatio = require('@tailwindcss/aspect-ratio');

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
             fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                playfair: ['Playfair Display', 'serif']
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.7s ease-out',
                'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
            },
            boxShadow: {
                'elegant': '0 4px 12px rgba(0, 0, 0, 0.05)',
                'button': '0 4px 15px rgba(0, 0, 0, 0.1)',
            },
        }
    },
    plugins: [typography, forms, aspectRatio],
    safelist: [
        'bg-gradient-to-tr',
        'bg-gradient-to-tl',
        'bg-gradient-to-br',
        'bg-gradient-to-bl',
        'from-green-100/50',
        'from-green-200/50',
        'from-green-300/50',
        'from-green-400/50',
        'from-green-500/50',
        'from-green-600/50',
        'to-green-600',
        'to-green-400',
        'from-blue-100/50',
        'from-blue-200/50',
        'from-blue-300/50',
        'from-blue-400/50',
        'from-blue-500/50',
        'from-blue-600/50',
        'to-blue-600',
        'to-blue-400',
        'to-green-50',
        'to-green-100',
        'to-green-200',
        'to-green-300',
        'to-green-400',
        'to-green-500',
        'text-white',
        'shadow-2xl',
        'shadow-black',
        'shadow-white',
        'border-lime-500/20',
        'border-lime-500',
        'text-dark-charcoal',
        'bg-soft-beige',
        'font-playfair',
        'font-poppins',
    ]
}