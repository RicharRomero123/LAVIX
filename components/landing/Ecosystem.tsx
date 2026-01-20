"use client";

import { motion } from "framer-motion";
import { CardMultidevice } from "./ecosystem/CardMultidevice";
import { CardPrinters } from "./ecosystem/CardPrinters";
import { CardRoles } from "./ecosystem/CardRoles";
import { CardCloud } from "./ecosystem/CardCloud";
import { CardDelivery } from "./ecosystem/CardDelivery";
import { CardReports } from './ecosystem/CardReports';

export default function Ecosystem() {
  return (
    // CAMBIO 1: Reduje el padding vertical (py-16 md:py-24) para quitar el "desvanecido" excesivo
    // Mantenemos el mismo fondo #010E9B para continuidad con la siguiente sección
    <section className="py-16 md:py-24 bg-[#010E9B] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Todo lo que necesitas, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              en un solo ecosistema.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-200/70 max-w-2xl mx-auto"
          >
            Lavix no es solo una página web. Es una infraestructura tecnológica completa diseñada para controlar tu lavandería de punta a punta.
          </motion.p>
        </div>

        {/* CONTENEDOR DEL GRID + LUCES CENTRALIZADAS */}
        <div className="relative">
            
            {/* CAMBIO 2: LUCES (BLURS) AGREGADAS EN EL MEDIO DEL COMPONENTE */}
            {/* Estas luces están DETRÁS del grid, concentradas en el centro para iluminar las tarjetas de vidrio */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none animate-pulse-slow delay-1000"></div>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-5">
              
              {/* Fila 1 y 2 */}
              <div className="md:col-span-2 md:row-span-2">
                  <CardMultidevice />
              </div>
              
              <div className="md:col-span-1 md:row-span-1">
                  <CardPrinters />
              </div>
              
              <div className="md:col-span-1 md:row-span-2">
                  <CardRoles />
              </div>
              
              <div className="md:col-span-1 md:row-span-1">
                  <CardCloud />
              </div>

              {/* Fila 3 */}
              <div className="md:col-span-2 md:row-span-1">
                  <CardDelivery />
              </div>
              
              <div className="md:col-span-2 md:row-span-1">
                  <CardReports />
              </div>

            </div>
        </div>

      </div>
    </section>
  );
}