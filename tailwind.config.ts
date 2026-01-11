import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tu paleta LAVIX
        lavix: {
          900: "#0F172A", // Azul Noche (Fondos oscuros / Textos principales)
          800: "#1E293B",
          600: "#2563EB", // Azul Eléctrico (Botones primarios)
          400: "#38BDF8", // Celeste Brillante (Acentos)
          100: "#F1F5F9", // Gris azulado muy claro (Fondos de pantalla)
        },
        brand: {
          cyan: "#06B6D4", // El color de la "X" del logo
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)'], // Usaremos variable CSS
      }
    },
  },
  plugins: [],
};
export default config;