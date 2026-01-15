"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // ESTE ES EL COLOR EXACTO DE TU IMAGEN (Deep Electric Blue)
  // Lo definimos aquí para asegurarnos que se aplique.
  const lavixBlue = "text-[#010E9B]";
  const lavixBg = "bg-[#010E9B]";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* =======================================
              LOGO DE LA MARCA
             ======================================= */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            
            {/* 1. ÍCONO (Imagen) */}
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
               <Image 
                 src="/assets/lavix-remove.png" 
                 alt="Isotipo Lavix"
                 width={40}
                 height={40}
                 className="object-contain" 
                 priority 
               />
            </div>

            {/* 2. TEXTO (FORZADO AL AZUL OSCURO EXACTO) */}
            <span className={`text-3xl font-black tracking-tighter ${lavixBlue} font-sans mb-1 group-hover:opacity-80 transition-opacity`}>
              lavix
            </span>
          </Link>

          {/* =======================================
              MENÚ DE ESCRITORIO
             ======================================= */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Enlaces con color gris oscuro, hover al azul de marca */}
            <a href="#beneficios" className={`text-sm font-bold text-slate-600 hover:${lavixBlue} transition-colors`}>
              Beneficios
            </a>
            <a href="#demo" className={`text-sm font-bold text-slate-600 hover:${lavixBlue} transition-colors`}>
              Cómo funciona
            </a>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <Link href="/login" className={`text-sm font-bold text-slate-900 hover:${lavixBlue} transition-colors`}>
                Ingresar
              </Link>
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  // AQUÍ TAMBIÉN FORZAMOS EL FONDO AZUL EXACTO
                  className={`px-6 py-2.5 ${lavixBg} text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:opacity-90 transition-all`}
                >
                  Prueba Gratis
                </motion.button>
              </Link>
            </div>
          </div>

          {/* =======================================
              BOTÓN MENÚ MÓVIL
             ======================================= */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 text-slate-600 hover:${lavixBlue} transition-colors`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* =======================================
          MENÚ MÓVIL
         ======================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <a href="#beneficios" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-600 py-2">
                Beneficios
              </a>
              <a href="#demo" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-600 py-2">
                Cómo funciona
              </a>
              <hr className="border-slate-100" />
              <Link 
                href="/login" 
                className="w-full py-4 text-center font-bold text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Ingresar
              </Link>
              <Link 
                href="/register" 
                className={`w-full py-4 text-center font-bold text-white ${lavixBg} rounded-xl hover:opacity-90 transition-colors shadow-lg`}
              >
                Crear Cuenta
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}