import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TUS COLORES DE MARCA CORREGIDOS
        lavix: {
          50:  "#eef0ff", // Fondo muy claro
          100: "#e0e4ff",
          200: "#c7cfff",
          400: "#6370ff",
          // TU COLOR EXACTO (RGB: 1, 14, 155) -> HEX: #010E9B
          600: "#010E9B", 
          // Un tono un poquito más oscuro para el efecto Hover
          700: "#000a7a", 
          900: "#00053d", // Azul casi negro para fondos oscuros
        }
      },
      fontFamily: {
        // Asegúrate que esto coincida con como nombraste la variable en layout.tsx
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;