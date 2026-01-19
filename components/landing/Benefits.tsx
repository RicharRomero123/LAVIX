"use client";

import { Camera, ShieldCheck, MessageSquare, Check, Lock, Zap, BarChart3, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Camera, // Icono de cámara para las fotos
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-900/20",
    title: "Seguridad y Garantía",
    headline: "Cero Reclamos",
    desc: "¿Cliente reclama por una mancha vieja? No más. Toma fotos de las prendas al recibirlas y guárdalas en el sistema.",
    features: ["Fotos ilimitadas por pedido", "Zoom de alta calidad", "Respaldo en la nube"]
  },
  {
    icon: ShieldCheck, // Icono de escudo para la caja
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-amber-900/20",
    title: "Control Financiero",
    headline: "Caja Cuadrada",
    desc: "Cierre de caja ciego. El sistema separa automáticamente lo que entró por Yape, Efectivo o Tarjeta. Adiós a las fugas.",
    features: ["Reporte de ingresos/gastos", "Arqueo de caja diario", "Control de Yape/Plin"]
  },
  {
    icon: MessageSquare, // Icono de mensaje
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-cyan-900/20",
    title: "Automatización",
    headline: "WhatsApp Auto",
    desc: "Deja de llamar uno por uno. Con un clic, envía el ticket digital y avisa que la ropa está lista para recoger.",
    features: ["Mensajes pre-configurados", "Envío de Ticket Digital", "Avisos de cobranza"]
  }
];

const miniFeatures = [
  { icon: Cloud, label: "Todo en la Nube (Accesible 24/7)" },
  { icon: Lock, label: "Datos Encriptados" },
  { icon: BarChart3, label: "Reportes en Tiempo Real" },
  { icon: Zap, label: "Soporte Técnico Incluido" },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-32 relative overflow-hidden bg-[#010E9B]">
      
      {/* 1. LUCES LATERALES (BLURS) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-64 w-[500px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid de Fondo Sutil */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ENCABEZADO GIGANTE */}
        <div className="mb-24">
          <motion.p 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-sm md:text-base"
          >
            /// ¿Por qué elegir Lavix?
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight"
          >
            Software diseñado <br />
            para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">dueños reales.</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-2 bg-blue-500 mt-8 rounded-full"
          />
        </div>

        {/* CARDS PRINCIPALES (BENTO GRID STYLE) */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/20 transition-all duration-500 flex flex-col h-full"
            >
              {/* Icono Flotante */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border ${item.color} shadow-lg transition-transform group-hover:scale-110 duration-500`}>
                <item.icon size={32} />
              </div>

              {/* Títulos */}
              <div className="mb-6">
                 <h4 className="text-blue-300 font-bold text-sm uppercase tracking-wider mb-2">{item.title}</h4>
                 <h3 className="text-3xl md:text-4xl font-black text-white leading-none">{item.headline}</h3>
              </div>
              
              {/* Descripción */}
              <p className="text-blue-100/70 text-base leading-relaxed mb-8 border-b border-white/10 pb-8">
                {item.desc}
              </p>

              {/* Lista de Features (Más info) */}
              <ul className="space-y-3 mt-auto">
                 {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm font-medium text-white/90">
                       <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                         <Check size={12} strokeWidth={3} />
                       </div>
                       {feature}
                    </li>
                 ))}
              </ul>

              {/* Efecto Hover Borde */}
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-white/5 pointer-events-none transition-colors duration-500"/>
            </motion.div>
          ))}
        </div>

        {/* BARRA DE FEATURES TÉCNICOS (Extra Info) */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="border-t border-white/10 pt-12 flex flex-wrap justify-center md:justify-between gap-8"
        >
           {miniFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-blue-200/60 hover:text-white transition-colors cursor-default">
                 <feat.icon size={20} />
                 <span className="font-semibold text-sm uppercase tracking-wide">{feat.label}</span>
              </div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}