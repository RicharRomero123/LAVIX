"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <-- 1. Importamos el componente Image
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO LAVIX (IMAGEN REAL) --- */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/assets/lavix-remove.png" // La ruta desde la carpeta 'public'
              alt="Logo de Lavix"
              width={140} // Ancho base para que Next.js sepa el ratio
              height={50} // Alto base
              className="w-auto h-12 object-contain" // Tailwind controla el tamaño final
              priority // Carga esta imagen con prioridad (bueno para el SEO)
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#beneficios" className="text-sm font-bold text-slate-500 hover:text-lavix-600 transition-colors">Beneficios</a>
            <a href="#demo" className="text-sm font-bold text-slate-500 hover:text-lavix-600 transition-colors">Cómo funciona</a>
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <Link href="/login" className="text-sm font-bold text-slate-900 hover:text-lavix-600 transition-colors">
                Ingresar
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-lavix-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-lavix-600/30"
                >
                  Prueba Gratis
                </motion.button>
              </Link>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <Link href="/login" className="w-full py-3 text-center font-bold text-slate-700 bg-slate-50 rounded-xl">
                Ingresar
              </Link>
              <Link href="/register" className="w-full py-3 text-center font-bold text-white bg-lavix-600 rounded-xl">
                Crear Cuenta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}