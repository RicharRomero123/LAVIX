"use client";
import { Users, ShieldCheck, Lock, Unlock, ScanLine } from "lucide-react";
import { motion } from "framer-motion";

export const CardRoles = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Glass Morado Oscuro
      className="h-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col hover:border-purple-500/30 transition-all duration-500 group relative overflow-hidden"
    >
       {/* --- EFECTOS DE FONDO --- */}
       {/* Glow Morado Pulsante */}
       <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 blur-[60px] rounded-full animate-pulse-slow"></div>
       
       {/* Línea de Escáner de Seguridad (Animación Vertical) */}
       <motion.div 
         animate={{ top: ["-10%", "120%"] }}
         transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
         className="absolute left-0 w-full h-1 bg-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.8)] z-0 pointer-events-none opacity-50"
       />

       {/* --- HEADER --- */}
       <div className="relative z-10 mb-6">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                 <ShieldCheck size={20} className="text-purple-400"/>
              </div>
              <div>
                  <h4 className="text-xl font-bold text-white leading-none">Control Total</h4>
                  <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] text-purple-200/60 uppercase font-bold tracking-wider">Sistema Seguro</span>
                  </div>
              </div>
           </div>
           <p className="text-xs text-blue-200/60">
              Define quién puede ver la caja y quién solo registra pedidos.
           </p>
       </div>
       
       {/* --- LISTA DE ROLES (TARJETAS DE CRISTAL) --- */}
       <div className="mt-auto space-y-3 relative z-10">
          
          {/* 1. DUEÑO (ADMIN) - ACCESO TOTAL */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/40 to-white/5 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-900/20 group/item">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center border border-white/20 shadow-inner">
                      <Users size={14} className="text-white"/>
                  </div>
                  <div>
                      <p className="text-xs font-bold text-white">Dueño</p>
                      <p className="text-[10px] text-purple-300">Admin Total</p>
                  </div>
              </div>
              <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                  <Unlock size={10} className="text-green-400"/>
                  <span className="text-[9px] font-bold text-green-400 uppercase">Activo</span>
              </div>
          </div>

          {/* 2. CAJERO - ACCESO LIMITADO */}
          <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5 opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-white/10">
                      <Users size={14} className="text-slate-300"/>
                  </div>
                  <div>
                      <p className="text-xs font-bold text-slate-200">Cajero</p>
                      <p className="text-[10px] text-slate-500">Solo Ventas</p>
                  </div>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                  <Lock size={10} className="text-yellow-500"/>
                  <span className="text-[9px] font-bold text-yellow-500 uppercase">Limitado</span>
              </div>
          </div>

          {/* 3. LAVADOR - SIN ACCESO A CAJA */}
          <div className="flex items-center justify-between p-2.5 bg-white/5 rounded-xl border border-white/5 opacity-60 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                      <Users size={14} className="text-slate-500"/>
                  </div>
                  <div>
                      <p className="text-xs font-bold text-slate-400">Lavador</p>
                      <p className="text-[10px] text-slate-600">Solo Procesos</p>
                  </div>
              </div>
              <div className="flex items-center gap-2 px-2 py-1">
                  <Lock size={10} className="text-slate-500"/>
                  <span className="text-[9px] font-bold text-slate-500 uppercase">Bloqueado</span>
              </div>
          </div>

       </div>
    </motion.div>
  );
};