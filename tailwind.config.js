/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'core': '#050505',
                'neon-cyan': '#00F0FF',
                'neon-purple': '#BC13FE',
                'neon-green': '#00FF94',
                'main': '#EDEDED',
                'muted': '#888888',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                display: ['Rajdhani', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
