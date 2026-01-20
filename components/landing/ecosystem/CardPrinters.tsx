"use client";
import { Printer, Usb, Bluetooth, Wifi } from "lucide-react";
import { motion } from "framer-motion";

export const CardPrinters = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between"
    >
       {/* Background Glow */}
       <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px] group-hover:bg-indigo-500/30 transition-all"></div>

       {/* --- HEADER --- */}
       <div className="relative z-10">
          <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/30 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
             <Printer size={20} className="text-indigo-400"/>
          </div>
          <h4 className="text-lg font-bold text-white mb-1">Hardware Universal</h4>
          <p className="text-xs text-blue-200/60 leading-relaxed max-w-[150px]">
             Compatible con cualquier impresora térmica, lector o gaveta.
          </p>
       </div>

       {/* --- ANIMACIÓN: IMPRESORA FUNCIONANDO --- */}
       <div className="relative h-28 w-full mt-4 flex items-end justify-center">
           
           {/* Iconos de Conectividad Flotantes */}
           <div className="absolute top-0 w-full flex justify-between px-2">
               <motion.div 
                 animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }} 
                 transition={{ duration: 2, repeat: Infinity }}
                 className="bg-white/10 p-1 rounded-md"
               >
                   <Usb size={12} className="text-white/60"/>
               </motion.div>
               <motion.div 
                 animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }} 
                 transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                 className="bg-blue-500/20 p-1 rounded-md"
               >
                   <Bluetooth size={12} className="text-blue-400"/>
               </motion.div>
           </div>

           {/* El Ticket (Papel) Saliendo */}
           <div className="absolute bottom-[30px] w-16 bg-white shadow-lg flex flex-col items-center pt-2 overflow-hidden z-0">
               <motion.div
                  animate={{ y: [-40, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-full px-2 space-y-1"
               >
                  {/* Líneas de texto simuladas en el ticket */}
                  <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                  <div className="flex gap-1">
                      <div className="w-2/3 h-1 bg-slate-200 rounded-full"></div>
                      <div className="w-1/3 h-1 bg-slate-300 rounded-full"></div>
                  </div>
                  <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                  <div className="w-1/2 h-1 bg-slate-200 rounded-full"></div>
                  
                  {/* Espacio vacío para repetir */}
                  <div className="h-4"></div>

                  <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                  <div className="flex gap-1">
                      <div className="w-2/3 h-1 bg-slate-200 rounded-full"></div>
                      <div className="w-1/3 h-1 bg-slate-300 rounded-full"></div>
                  </div>
               </motion.div>
               {/* Sombra al final del papel */}
               <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-white to-transparent"></div>
           </div>

           {/* Cuerpo de la Impresora */}
           <div className="relative z-10 w-24 h-10 bg-slate-800 rounded-t-xl border-t border-x border-slate-600 shadow-xl flex items-center justify-center">
               {/* Ranura de salida */}
               <div className="absolute -top-1 w-20 h-1.5 bg-slate-900 rounded-full"></div>
               
               {/* Luz de estado */}
               <div className="absolute right-3 top-3 flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
               </div>
               
               {/* Branding sutil */}
               <div className="w-8 h-1 bg-slate-600 rounded-full opacity-50"></div>
           </div>

       </div>
    </motion.div>
  );
};