import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors : {
        current : 'currentColor',
        'fern-frond': {
          '50': '#ffffe2',
          '100': '#fcffc1',
          '200': '#f8ff8b',
          '300': '#eeff48',
          '400': '#dfff12',
          '500': '#c0f000',
          '600': '#94c100',
          '700': '#709200',
          '800': '#5a7302',
          '900': '#4a6007',
          '950': '#263600',
        },
        'atoll': {
          '50': '#edfffd',
          '100': '#c3fffe',
          '200': '#87fffe',
          '300': '#43ffff',
          '400': '#0cf4f5',
          '500': '#00d6d8',
          '600': '#00a8ae',
          '700': '#00838a',
          '800': '#026c73',
          '900': '#07555a',
          '950': '#003137',
        },
        'red-beech': {
          '50': '#fffde9',
          '100': '#fff9c0',
          '200': '#fff37c',
          '300': '#ffe538',
          '400': '#ffd30a',
          '500': '#ffae00',
          '600': '#f38200',
          '700': '#c95700',
          '800': '#a24200',
          '900': '#732f02',
          '950': '#4d1b00',
        },
        'woodsmoke': {
          '50': '#f3f5f8',
          '100': '#e1e8ec',
          '200': '#c7d2da',
          '300': '#a0b2c0',
          '400': '#728a9e',
          '500': '#576f83',
          '600': '#4a5c70',
          '700': '#414e5d',
          '800': '#3b444f',
          '900': '#343b45',
          '950': '#0c0e11',
        },
      },
    },
  },
  plugins: [],

};
export default config;