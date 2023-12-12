/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                roboto: ['Roboto', 'sans-serif'],
                bree: ['Bree Serif', 'serif', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
    colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        grey: '#D9D9D9',
        gray: '#F7F7F7',
        mob: '#F8FAFF',
        gray2: '#E3E3E3',
        grey2: '#3F3F3F',
        blade: '#232323',
        blue: '#2885CA',
    },
};
