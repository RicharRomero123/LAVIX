"use client";
import { Laptop } from "lucide-react";
import { motion } from "framer-motion";

export const CardMultidevice = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between"
    >
       {/* Fondo Ambiental */}
       <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-[100px] group-hover:bg-cyan-400/30 transition-all duration-700"></div>
       
       {/* --- TEXTO SUPERIOR --- */}
       <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                <Laptop size={24} className="text-white"/>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
                <span className="text-[10px] text-white font-bold uppercase tracking-wider">Online</span>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md">Multidispositivo</h3>
          <p className="text-blue-50 leading-relaxed font-medium opacity-90">
             Disfruta la versatilidad de usar Lavix donde quieras. Gestiona tu negocio desde una laptop, tablet o celular con total fluidez.
          </p>
       </div>

       {/* --- DISPOSITIVOS DISTRIBUIDOS --- */}
       <div className="relative mt-14 h-48 w-full flex items-end justify-center perspective-1000">
           
           {/* 1. TABLET (Izquierda - Separada) */}
           <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              // CAMBIO: 'left-4' para anclarla a la izquierda, separándola del centro
              className="absolute left-4 bottom-10 w-32 h-40 bg-slate-300 border-[2px] border-slate-400 rounded-xl shadow-2xl transform -rotate-6 opacity-90 z-0 flex flex-col overflow-hidden"
           >
              <div className="w-full h-full bg-white p-3 space-y-2">
                 <div className="w-full h-3 bg-slate-100 rounded-full"></div>
                 <div className="flex gap-1">
                    <div className="w-1/2 h-20 bg-blue-50 rounded-lg border border-blue-100"></div>
                    <div className="w-1/2 h-20 bg-blue-50 rounded-lg border border-blue-100"></div>
                 </div>
              </div>
           </motion.div>

           {/* 2. LAPTOP (Centro - Principal) */}
           <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-52 mb-6"
           >
              <div className="w-52 h-36 bg-white border-[4px] border-slate-200 rounded-t-xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col">
                  <div className="h-6 bg-slate-100 border-b border-slate-200 flex items-center px-2 gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-3 flex gap-2 h-full">
                      <div className="w-1/3 h-full space-y-2 pt-1">
                          <div className="w-full h-4 bg-blue-500 rounded-md shadow-sm opacity-90"></div>
                          <div className="w-3/4 h-2 bg-slate-100 rounded"></div>
                          <div className="w-full h-2 bg-slate-100 rounded"></div>
                      </div>
                      <div className="w-2/3 h-[90%] bg-slate-50 rounded-lg border border-slate-100 p-2 shadow-inner">
                          <div className="flex justify-between mb-2">
                              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm"></div>
                              <div className="w-12 h-4 bg-slate-200 rounded"></div>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded mb-1"></div>
                          <div className="w-2/3 h-2 bg-slate-200 rounded"></div>
                      </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="w-60 h-3 bg-slate-300 rounded-b-lg -ml-4 border-t border-slate-400 shadow-xl relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-slate-400/50 rounded-b-md"></div>
              </div>
           </motion.div>

           {/* 3. CELULAR (Derecha - Separado) */}
           <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              // CAMBIO: 'right-4' para anclarlo a la derecha, separándolo del centro
              className="absolute right-18 bottom-4 w-16 h-32 bg-white border-[4px] border-slate-300 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] z-20 overflow-hidden flex flex-col"
           >
              <div className="w-full h-4 bg-white flex justify-center relative z-10 border-b border-slate-100">
                  <div className="w-6 h-2 bg-slate-200 rounded-b-md"></div>
              </div>
              
              <div className="p-2 space-y-2 flex-1 bg-slate-50">
                  <div className="w-full h-10 bg-blue-500 rounded-lg shadow-md shadow-blue-200 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-white/30"></div>
                  </div>
                  <div className="w-full h-16 bg-white rounded-lg border border-slate-100 shadow-sm p-1 gap-1 flex flex-col">
                       <div className="w-full h-2 bg-slate-100 rounded-sm"></div>
                       <div className="w-2/3 h-2 bg-slate-100 rounded-sm"></div>
                  </div>
              </div>

              <div className="w-full h-3 bg-white flex justify-center items-center border-t border-slate-100">
                   <div className="w-6 h-1 bg-slate-300 rounded-full"></div>
              </div>
           </motion.div>

       </div>
    </motion.div>
  );
};