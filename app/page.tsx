"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importamos el hook de navegación
import { Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Inicializamos el router

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de conexión con Backend
    setTimeout(() => {
      setIsLoading(false);
      // REDIRECCIÓN: Lleva al usuario al Dashboard de Recepción
      router.push("/dashboard/reception");
    }, 2000);
  };

  return (
    // 1. CONTENEDOR PRINCIPAL (FONDO DE MARCA):
    // - Usamos el azul más oscuro (lavix-900) como base.
    // - 'relative overflow-hidden' contiene los efectos de luz.
    <div className="min-h-screen flex items-center justify-center bg-lavix-900 p-4 relative overflow-hidden">
      
      {/* --- EFECTOS DE FONDO (Luces sutiles) --- */}
      {/* Luz Azul Eléctrica arriba a la izquierda */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lavix-600/30 rounded-full blur-[100px] pointer-events-none"></div>
      {/* Luz Cian abajo a la derecha */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-brand-cyan/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 2. CARD DE LOGIN (BLANCA PARA CONTRASTE):
          - Blanca para legibilidad perfecta.
          - Sombra fuerte y bordes redondeados.
          - z-10 para estar sobre las luces.
      */}
      <div className="w-full max-w-md bg-white shadow-2xl shadow-black/20 rounded-3xl p-8 md:p-10 transition-all relative z-10">
        
        {/* LOGO HERO */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            {/* Logo Tipográfico LAVIX */}
            <h1 className="text-5xl font-black tracking-tighter text-lavix-900">
              lavi<span className="text-brand-cyan">x</span>
            </h1>
          </div>
          <p className="text-lavix-500 font-medium text-sm">
            Sistema Operativo de Limpieza
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Input Usuario */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-lavix-800 ml-2">USUARIO / ID</label>
            <input 
              type="text" 
              placeholder="Ej. admin"
              className="w-full px-4 py-4 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-lavix-600 focus:bg-white focus:outline-none transition-all font-bold text-lg text-lavix-900 placeholder:text-slate-400"
              required
            />
          </div>

          {/* Input Contraseña */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-2">
              <label className="text-sm font-bold text-lavix-800">CONTRASEÑA</label>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-4 rounded-2xl bg-slate-100 border-2 border-transparent focus:border-lavix-600 focus:bg-white focus:outline-none transition-all font-bold text-lg text-lavix-900 placeholder:text-slate-400"
              required
            />
          </div>

          {/* Botón Principal */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-lavix-600 hover:bg-lavix-700 active:scale-95 text-white font-bold text-lg rounded-2xl shadow-xl shadow-lavix-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Conectando...
              </>
            ) : (
              <>
                INGRESAR <ArrowRight size={22} />
              </>
            )}
          </button>

        </form>

        {/* Footer discreto */}
        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Lavix Technologies © 2026
          </p>
        </div>

      </div>
    </div>
  );
}