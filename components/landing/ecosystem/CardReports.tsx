"use client";
import { FileSpreadsheet, Download, Table2 } from "lucide-react";
import { motion } from "framer-motion";

export const CardReports = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Gradiente sutil Emerald para diferenciarlo
      className="h-full bg-gradient-to-br from-emerald-900/10 to-teal-900/10 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden"
    >
       {/* Fondo de Cuadrícula (Grid Pattern) */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:14px_14px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
       
       {/* Glow Verde */}
       <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-[50px] group-hover:bg-emerald-500/30 transition-all"></div>

       {/* --- TEXTO --- */}
       <div className="relative z-10 max-w-[60%]">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                <FileSpreadsheet size={20} className="text-emerald-400"/>
              </div>
              <h4 className="text-lg font-bold text-white leading-tight">Contabilidad Excel</h4>
           </div>
           <p className="text-xs text-blue-100/70 leading-relaxed">
              Descarga tus ventas, gastos y caja mensual. Listo para tu contador.
           </p>
       </div>
       
       {/* --- MINI EXCEL ANIMADO --- */}
       <div className="relative z-10">
          <motion.div 
            whileHover={{ y: -5, rotate: 2 }}
            className="w-24 h-28 bg-slate-900 border border-emerald-500/30 rounded-xl shadow-2xl relative overflow-hidden flex flex-col"
          >
              {/* Header Excel */}
              <div className="h-5 bg-emerald-600 flex items-center px-2 gap-1">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                  <div className="w-10 h-1 bg-white/30 rounded-full"></div>
              </div>
              
              {/* Filas Animadas (Simulando Datos) */}
              <div className="p-2 space-y-2 flex-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex gap-1">
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, repeatDelay: 2 }}
                           className="h-1.5 bg-slate-700 rounded-sm"
                        />
                        <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "100%" }}
                           transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 + 0.1, repeatDelay: 2 }}
                           className="h-1.5 bg-emerald-500/50 rounded-sm w-1/3"
                        />
                    </div>
                  ))}
              </div>

              {/* Botón Flotante Download */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                  <motion.div 
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                      <Download size={14} className="text-emerald-600 font-bold"/>
                  </motion.div>
              </div>
          </motion.div>
          
          {/* Sombra debajo del archivo */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/40 blur-md rounded-full"></div>
       </div>
    </motion.div>
  );
};