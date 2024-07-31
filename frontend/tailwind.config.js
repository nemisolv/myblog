/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                body: ['Poppins', 'san-serif'],
            },

            colors: {
                primary: '#9400FF',
                placeholder: '#C4C4C4',
                lightGray: '#6B6B6B',
            },
        },
    },
    plugins: [],
};
