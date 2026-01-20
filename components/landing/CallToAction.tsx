"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, CheckCircle2 } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#010E9B] flex items-center justify-center">
      
      {/* --- FONDO "PORTAL" --- */}
      
      {/* 1. Grid de suelo en perspectiva (Sensación 3D) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* 2. Luz Central (El Núcleo) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        
        {/* TITULO CON GRADIENTE ANIMADO */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight"
        >
          ¿Listo para dejar <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
             el cuaderno en el pasado?
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-2xl mx-auto font-medium"
        >
          Únete a las lavanderías modernas que ya controlan su negocio desde el celular. Empieza hoy mismo.
        </motion.p>

        {/* --- CTA PRINCIPAL --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
            {/* BOTÓN GIGANTE */}
            <Link 
              href="/register" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-[#010E9B] rounded-full font-black text-lg md:text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <div className="absolute inset-0 rounded-full ring-4 ring-white/30 group-hover:ring-white/50 transition-all animate-pulse"></div>
              
              <Rocket size={24} className="group-hover:-translate-y-1 transition-transform duration-300 fill-[#010E9B]" />
              <span>OBTENER 30 DÍAS GRATIS</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* GARANTÍAS (TEXTO PEQUEÑO) */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-bold text-blue-300/60 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400" /> Sin tarjeta de crédito
                </span>
                <span className="hidden md:block w-1 h-1 bg-blue-500 rounded-full"></span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400" /> Cancela cuando quieras
                </span>
                <span className="hidden md:block w-1 h-1 bg-blue-500 rounded-full"></span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-cyan-400" /> Soporte incluido
                </span>
            </div>
        </motion.div>
      </div>
      
    </section>
  );
}