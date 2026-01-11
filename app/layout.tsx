import type { Metadata } from "next";
import { Outfit } from "next/font/google"; 
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  weight: ['300', '400', '600', '700', '900'] 
});

export const metadata: Metadata = {
  title: "LAVIX | Sistema Operativo de Limpieza",
  description: "Gestión inteligente para lavanderías",
  // viewport: user-scalable=no previene zoom accidental en móviles (sensación nativa)
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} font-sans bg-gray-50 text-slate-900 antialiased`}>
        {/* Aquí ya NO limitamos el ancho. Dejamos que los componentes decidan. */}
        {children}
      </body>
    </html>
  );
}