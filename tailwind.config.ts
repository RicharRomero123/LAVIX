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
        // TUS COLORES DE MARCA
        lavix: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          400: "#6366f1",
          600: "#0028C0", // Azul Eléctrico Principal (Aprox. Logo)
          700: "#0020A0", // Hover
          900: "#000a45", // Azul Noche (Fondo oscuro)
        }
      },
      fontFamily: {
        // Esto conecta con tu layout.tsx
        sans: ['var(--font-outfit)', 'sans-serif'],
      },
      // Animaciones para la web
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
  plugins: [
    require("tailwindcss-animate"), // <--- ESTA ES LA FORMA CORRECTA
    // Si tenías "tw-animate-css", bórralo y pon este.
  ],
};
export default config;