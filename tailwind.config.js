/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontSize: {
				sx: '10px',
			},
			colors: {
				main: '#fb6f92',
			},
		},
	},
	plugins: [],
};
