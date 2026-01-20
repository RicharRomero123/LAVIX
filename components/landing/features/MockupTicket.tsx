"use client";

import { useState, useEffect } from "react";
import { QrCode, Receipt, ScanLine, CheckCircle2, Package, Smartphone, ChevronRight, Lock } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion"; // <--- 1. Importamos Variants

export const MockupTicket = () => {
  // Estado para alternar entre Ticket Físico y Web de Tracking
  const [showTracker, setShowTracker] = useState(false);

  useEffect(() => {
    // Ciclo: 4.5s Ticket <-> 4.5s Web
    const interval = setInterval(() => {
      setShowTracker((prev) => !prev);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // --- SOLUCIÓN DEL ERROR ---
  // Tipamos explícitamente como 'Variants' para que TS entienda la estructura
  const scannerVariants: Variants = {
    scanning: {
      top: ["0%", "100%"],
      opacity: [0, 1, 1, 0],
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-full max-w-[380px] mx-auto h-[580px] perspective-1000">
      
      {/* Glow de fondo (Sutil) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-[60px] rounded-full opacity-30 -z-10"></div>

      <AnimatePresence mode="wait">
        
        {!showTracker ? (
          // ============================================================
          // VISTA 1: EL TICKET FÍSICO (PAPEL)
          // ============================================================
          <motion.div
            key="receipt"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="absolute inset-0 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-slate-600 flex flex-col border-[6px] border-white/50 origin-center backface-hidden"
          >
             {/* Borde superior decorativo */}
             <div className="h-2 w-full bg-blue-600 absolute top-0 left-0 z-20"></div>

             {/* LÁSER DE ESCANEO */}
             <motion.div
                 variants={scannerVariants}
                 animate="scanning"
                 // Nota: Aquí 'delay' se fusiona con la transición definida en la variante
                 // Si TS se queja aquí también, mueve el delay adentro de variants o úsalo así (generalmente funciona)
                 transition={{ delay: 3 }} 
                 className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent z-30 pointer-events-none flex items-center"
              >
                  <div className="w-full h-0.5 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)]"></div>
              </motion.div>

             {/* Contenido Ticket */}
             <div className="p-8 flex-1 flex flex-col relative z-10">
                <div className="flex items-center justify-between mb-6 pt-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <Receipt size={24} className="text-blue-600"/>
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 text-lg uppercase tracking-wider">Ticket #0492</h3>
                            <p className="text-xs font-medium text-slate-400">14 ENE • 10:42 AM</p>
                        </div>
                    </div>
                </div>

                <div className="w-full my-2 border-t-2 border-dashed border-slate-200"></div>

                {/* Items */}
                <div className="py-6 space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-slate-900 text-base">1x Edredón King</p>
                            <p className="text-xs text-slate-400 mt-0.5">Lavado + Secado</p>
                        </div>
                        <span className="font-bold text-slate-900">S/ 25.00</span>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-slate-900 text-base">2x Camisas</p>
                            <p className="text-xs text-slate-400 mt-0.5">Planchado Vapor</p>
                        </div>
                        <span className="font-bold text-slate-900">S/ 12.00</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end border-t border-slate-100 pt-4">
                    <span className="text-sm font-bold uppercase text-slate-400">Total</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tight">S/ 37.00</span>
                </div>
             </div>

             {/* Footer QR */}
             <div className="bg-slate-50 p-6 border-t border-slate-100 flex flex-col items-center relative">
                 <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 relative group">
                    <QrCode size={90} className="text-slate-900"/>
                    <div className="absolute -right-2 -bottom-2 bg-blue-600 text-white p-2 rounded-full shadow-lg animate-bounce">
                        <ScanLine size={16}/>
                    </div>
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">Escanear para seguimiento</p>
                 
                 {/* Decoración papel */}
                 <div className="absolute bottom-0 left-0 w-full h-3 bg-slate-50" style={{
                    maskImage: "linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)",
                    maskSize: "12px 12px", maskRepeat: "repeat-x", WebkitMaskImage: "linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)", WebkitMaskSize: "12px 12px"
                 }}></div>
             </div>
          </motion.div>
        ) : (
          // ============================================================
          // VISTA 2: WEB APP TRACKING
          // ============================================================
          <motion.div
            key="webapp"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="absolute inset-0 bg-slate-50 rounded-[2.5rem] overflow-hidden border-[12px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_20px_60px_rgba(0,0,0,0.4)] origin-center backface-hidden flex flex-col"
          >
             {/* --- BARRA DE NAVEGADOR --- */}
             <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-3 pt-5 shadow-sm z-20">
                <div className="bg-slate-100 flex-1 rounded-full px-4 py-2 flex items-center gap-2 text-xs text-slate-500">
                    <Lock size={10} className="text-green-500"/>
                    <span className="font-medium">lavix.app/track/0492</span>
                </div>
             </div>

             {/* --- CONTENIDO WEB --- */}
             <div className="flex-1 overflow-hidden relative flex flex-col">
                
                {/* Header Pedido */}
                <div className="bg-white p-6 pb-8 shadow-sm relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold uppercase mb-1">En Proceso</span>
                            <h2 className="text-2xl font-black text-slate-900">Pedido #0492</h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <Smartphone size={20} className="text-slate-400"/>
                        </div>
                    </div>
                    
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-blue-500"
                        />
                    </div>
                    <p className="text-right text-[10px] text-slate-400 mt-1 font-medium">65% Completado</p>
                </div>

                {/* Timeline */}
                <div className="p-6 space-y-0 flex-1 bg-slate-50">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Estado Actual</p>
                    
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-10">
                        {/* Paso 1 */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm flex items-center justify-center">
                                <CheckCircle2 size={10} className="text-white"/>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm">Pedido Recibido</h4>
                            <p className="text-xs text-slate-500">10:42 AM • Tienda Central</p>
                        </div>

                        {/* Paso 2 (Activo) */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-500 shadow-sm animate-pulse"></div>
                            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 -mt-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-blue-600 text-sm">Lavando y Secando</h4>
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Tus prendas están en proceso de limpieza profunda.</p>
                                <div className="flex items-center gap-2 text-[10px] text-blue-500 font-bold bg-blue-50 w-fit px-2 py-1 rounded-md">
                                    <Package size={12}/>
                                    Detalle: 3 Prendas
                                </div>
                            </div>
                        </div>

                         {/* Paso 3 */}
                         <div className="relative pl-8 opacity-50">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 border-2 border-white"></div>
                            <h4 className="font-bold text-slate-400 text-sm">Listo para Recoger</h4>
                            <p className="text-xs text-slate-400">Estimado: 6:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Footer Web App */}
                <div className="bg-white p-4 border-t border-slate-200 flex justify-between items-center shadow-lg">
                    <div className="text-[10px] text-slate-400 font-medium">
                        ¿Necesitas ayuda? <br/> <span className="text-blue-500 underline">Chat Soporte</span>
                    </div>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1">
                        Ver Detalles <ChevronRight size={12}/>
                    </button>
                </div>

             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};