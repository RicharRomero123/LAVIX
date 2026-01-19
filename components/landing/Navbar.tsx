"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- 1. Importamos el componente Image
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Definimos el color exacto para que coincida con tu logo (Azul Eléctrico Oscuro)
  const lavixBlue = "text-[#010E9B]";
  const lavixBg = "bg-[#010E9B]";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO LAVIX (Imagen + Texto) --- */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            
            {/* 1. EL ÍCONO (Tu imagen real desde assets) */}
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
               <Image 
                 src="/assets/lavix-logo.png" // <--- Aquí jalamos tu imagen
                 alt="Isotipo Lavix"
                 width={40}
                 height={40}
                 className="object-contain" 
                 priority // Carga inmediata para que no parpadee
               />
            </div>
            
            {/* 2. EL TEXTO (Escrito con el color forzado para que coincida) */}
            <span className={`text-3xl font-black tracking-tighter ${lavixBlue} group-hover:opacity-80 transition-opacity font-sans mb-1`}>
              lavix
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#beneficios" className="text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors">Beneficios</a>
            <a href="#demo" className="text-sm font-bold text-slate-500 hover:text-blue-900 transition-colors">Cómo funciona</a>
            
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <Link href="/login" className="text-sm font-bold text-slate-900 hover:text-blue-900 transition-colors">
                Ingresar
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 ${lavixBg} text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all`}
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
              <Link href="/register" className={`w-full py-3 text-center font-bold text-white ${lavixBg} rounded-xl`}>
                Crear Cuenta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}