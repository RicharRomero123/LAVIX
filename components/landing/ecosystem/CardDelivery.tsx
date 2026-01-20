"use client";
import { Bike, MapPin, Navigation, LocateFixed } from "lucide-react";
import { motion } from "framer-motion";

export const CardDelivery = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Glass Oscuro con acentos Naranja
      className="h-full bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 relative overflow-hidden group flex items-center justify-between hover:bg-orange-900/10 hover:border-orange-500/30 transition-all duration-500"
    >
       {/* Glow Ambiental Naranja */}
       <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-orange-600/20 rounded-full blur-[80px] group-hover:bg-orange-600/30 transition-all"></div>
       
       {/* Fondo de Mapa Sutil */}
       <div className="absolute inset-0 bg-[url('/assets/map-pattern.svg')] opacity-[0.05] pointer-events-none bg-cover mix-blend-overlay"></div>

       {/* --- TEXTO --- */}
       <div className="relative z-10 max-w-[55%]">
           <div className="flex items-center gap-3 mb-3">
              {/* Icono Principal con Radar */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-xl animate-ping opacity-50"></div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center relative z-10">
                      <Bike size={22} className="text-orange-400"/>
                  </div>
              </div>
              <div>
                  <h4 className="text-xl font-bold text-white leading-none">App Motorizado</h4>
                  <div className="flex items-center gap-1 mt-1 text-orange-300/80 font-medium text-[10px] uppercase tracking-wider">
                      <LocateFixed size={10} className="animate-pulse"/> Rastreo GPS en vivo
                  </div>
              </div>
           </div>
           <p className="text-xs text-blue-200/70 leading-relaxed">
             Tus repartidores tienen su propia App. Asigna rutas óptimas y sigue sus entregas en tiempo real.
           </p>
       </div>

       {/* --- ANIMACIÓN: LA RUTA DE ENTREGA --- */}
       <div className="relative w-36 h-32 hidden sm:flex items-center justify-center perspective-1000">
           
           {/* El Mapa Base (Rotado para 3D) */}
           <div className="absolute inset-0 bg-slate-900/50 rounded-2xl border border-white/10 transform rotate-x-12 scale-90 overflow-hidden">
               {/* Cuadrícula de mapa */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]"></div>
           </div>

           {/* La Ruta SVG Brillante */}
           <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* Sombra de la ruta */}
               <path d="M 10 80 Q 40 10 90 30" stroke="rgba(0,0,0,0.5)" strokeWidth="4" fill="none" transform="translate(2,4)"/>
               {/* Línea de ruta naranja */}
               <path d="M 10 80 Q 40 10 90 30" stroke="#f97316" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="5 5" className="drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] opacity-80"/>
           </svg>

           {/* Marcador de Inicio (Tienda) */}
           <div className="absolute left-[5%] bottom-[15%]">
               <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping absolute opacity-50"></div>
               <div className="w-4 h-4 bg-slate-900 border-2 border-orange-500 rounded-full relative z-10 flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
               </div>
           </div>
           
           {/* Marcador de Destino (Cliente) */}
           <div className="absolute right-[5%] top-[25%]">
                <MapPin size={24} className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,1)] animate-bounce z-20 relative"/>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-orange-500/50 blur-md rounded-full"></div>
           </div>

           {/* El Vehículo en Movimiento (Animación de trayectoria compleja) */}
           <motion.div
               // Keyframes aproximados para seguir la curva SVG "M 10 80 Q 40 10 90 30"
               animate={{
                   left: ["10%", "25%", "50%", "75%", "90%"],
                   top:  ["80%", "50%", "25%", "20%", "30%"],
                   rotate: [0, -20, 0, 20, 0] // Inclinación en curvas
               }}
               transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut",
                   times: [0, 0.25, 0.5, 0.75, 1]
               }}
               className="absolute z-30"
               style={{ left: "10%", top: "80%" }} // Posición inicial
           >
               {/* Radar de la moto */}
               <div className="absolute inset-0 bg-orange-500/30 rounded-full animate-ping opacity-70 scale-150"></div>
               {/* Icono de Navegación */}
               <div className="bg-white text-orange-600 p-1.5 rounded-full shadow-lg shadow-orange-500/50 border border-orange-200 relative z-10 transform -rotate-45">
                   <Navigation size={16} fill="currentColor" />
               </div>
           </motion.div>

       </div>
    </motion.div>
  );
};