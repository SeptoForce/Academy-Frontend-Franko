import type {Config} from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"header-lt": "#d14526",
				"page-lt": "#eeeeee",
				"details-bg-lt": "#ffffff",
				"text-lt": "#262626",
				"favourite-icon-lt": "#acacac",
				"header-dt": "#516289",
				"page-dt": "#374157",
				"details-bg-dt": "#212734",
				"text-dt": "#a1a1a1",
				"type-normal": "#a8a87d",
				"type-fire": "#e18644",
				"type-water": "#708fe9",
				"type-grass": "#8bc660",
				"type-electric": "#f2d154",
				"type-ice": "#a6d6d7",
				"type-fighting": "#b13d31",
				"type-poison": "#94469b",
				"type-flying": "#a491ea",
				"type-psychic": "#e66388",
				"type-ghost": "#6c5994",
				"type-steel": "#b8b8ce",
				"type-fairy": "#e7b8bd",
			},
		},
	},
	plugins: [],
};
export default config;
