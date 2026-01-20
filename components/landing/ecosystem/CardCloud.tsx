"use client";
import { Cloud, Server, Database, ShieldCheck, Network } from "lucide-react";
import { motion } from "framer-motion";

export const CardCloud = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Glass Gradiente Cian/Azul más profundo
      className="h-full bg-gradient-to-br from-cyan-950/50 to-blue-950/50 border border-cyan-500/20 backdrop-blur-2xl rounded-3xl p-6 relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-500"
    >
       {/* --- ATMÓSFERA Y FONDO --- */}
       {/* Glow ambiental */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all"></div>
       {/* Patrón de circuito sutil */}
       <div className="absolute inset-0 bg-[url('/assets/circuit.svg')] opacity-[0.03] pointer-events-none"></div>
       
       {/* Servidor Gigante de Fondo (Sutil) */}
       <Server size={100} className="absolute -bottom-8 -right-8 text-cyan-500/5 rotate-12"/>

       {/* --- HEADER --- */}
       <div className="relative z-20 mb-8">
           <div className="flex items-center gap-3 mb-3">
               {/* Icono Principal Animado */}
               <div className="relative w-12 h-12 flex items-center justify-center">
                   {/* Ondas de señal expandiéndose */}
                   {[1, 2].map((i) => (
                     <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                        className="absolute inset-0 bg-cyan-500/30 rounded-full blur-md"
                     />
                   ))}
                   {/* Núcleo de la Nube */}
                   <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <Cloud size={24} className="text-cyan-300"/>
                   </div>
               </div>

               <div>
                  <h4 className="text-xl font-bold text-white leading-none mb-1">Infraestructura Cloud</h4>
                  {/* Insignia AWS */}
                  <div className="inline-flex items-center gap-1.5 bg-slate-900/50 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      <ShieldCheck size={10} className="text-orange-400"/>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">Powered by AWS</span>
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse ml-1"></div>
                  </div>
               </div>
           </div>
           <p className="text-xs text-cyan-100/70 leading-relaxed relative z-20 max-w-[200px]">
              Tus datos viven en los servidores más seguros del mundo. Accesibles 24/7, sin mantenimiento.
           </p>
       </div>

       {/* --- VISUALIZACIÓN DE FLUJO DE DATOS (LA "VIRTUD") --- */}
       <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden z-10 pointer-events-none">
           
           {/* 1. Base de Servidores (El destino) */}
           <div className="absolute bottom-0 left-6 right-6 h-10 bg-gradient-to-t from-blue-900/40 to-transparent border-b border-cyan-500/20 rounded-b-lg flex justify-around items-end pb-2 px-4 opacity-70">
               <div className="w-8 h-4 bg-cyan-500/10 rounded-t-md border-t border-x border-cyan-500/20 animate-pulse"></div>
               <div className="w-8 h-6 bg-cyan-500/10 rounded-t-md border-t border-x border-cyan-500/20 animate-pulse delay-75"></div>
               <div className="w-8 h-3 bg-cyan-500/10 rounded-t-md border-t border-x border-cyan-500/20 animate-pulse delay-150"></div>
           </div>

           {/* 2. Líneas de Conexión de Datos (Animadas) */}
           <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
               {/* Línea Curva Izquierda */}
               <motion.path
                  d="M 40 0 Q 40 60 80 100"
                  stroke="url(#gradient-cyan)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5 5"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="opacity-40"
               />
               {/* Línea Curva Derecha (Más rápida) */}
               <motion.path
                  d="M 200 0 Q 200 60 160 100"
                  stroke="url(#gradient-cyan)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="opacity-60"
               />
               
               {/* Definición del gradiente para las líneas */}
               <defs>
                   <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" stopColor="rgba(6, 182, 212, 0)"/>
                       <stop offset="100%" stopColor="rgba(6, 182, 212, 0.8)"/>
                   </linearGradient>
               </defs>
           </svg>

           {/* 3. Partículas de Datos Viajando */}
           <motion.div
              animate={{ top: ["0%", "100%"], left: ["20%", "30%"], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeIn" }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_cyan]"
           />
           <motion.div
              animate={{ top: ["10%", "110%"], left: ["70%", "60%"], opacity: [1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.5, ease: "easeIn" }}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_5px_cyan]"
           />

       </div>
    </motion.div>
  );
};