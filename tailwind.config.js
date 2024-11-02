/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}", "./public/**/*.{html,js}", "./views/**/*.ejs"];
export const theme = {
	extend: {
		colors: {
			"custom-blue": "#4377bb",
		},
	},
};
export const plugins = [];
