"use client";

import { Camera, ShieldCheck, MessageSquare, Check, Lock, Zap, BarChart3, Cloud, Server } from "lucide-react";
import { motion } from "framer-motion";

// --- DATOS DEL COMPONENTE ---
const benefits = [
  {
    icon: Camera,
    // Colores tipo "Neón" para resaltar sobre fondo oscuro
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_20px_rgba(251,113,133,0.3)]",
    title: "Seguridad y Evidencia",
    headline: "Cero Reclamos",
    desc: "Evita que te culpen por daños que no hiciste. El sistema obliga a tomar foto de cada prenda al recibirla.",
    features: [
      "Fotos ilimitadas por pedido",
      "Zoom de alta resolución",
      "Respaldo seguro en la Nube"
    ]
  },
  {
    icon: ShieldCheck,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    title: "Control Financiero",
    headline: "Caja Blindada",
    desc: "Detecta el 'robo hormiga' al instante. El sistema cruza lo que ingresó por Yape vs. Efectivo automáticamente.",
    features: [
      "Cierre de caja ciego",
      "Reporte de fugas de dinero",
      "Auditoría de descuentos"
    ]
  },
  {
    icon: MessageSquare,
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    title: "Automatización",
    headline: "WhatsApp Auto",
    desc: "Tu negocio se comunica solo. Envía tickets digitales y avisa 'Ropa Lista' sin que tengas que escribir nada.",
    features: [
      "Envío de Ticket PDF",
      "Aviso de recojo automático",
      "Recuperación de clientes"
    ]
  }
];

// Datos técnicos para la barra inferior
const miniFeatures = [
  { icon: Cloud, label: "Todo en la Nube (24/7)" },
  { icon: Lock, label: "Datos Encriptados" },
  { icon: BarChart3, label: "Reportes en Tiempo Real" },
  { icon: Server, label: "Backups Diarios" },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 md:py-32 relative overflow-hidden bg-[#010E9B]">
      
      {/* --- 1. FONDO AMBIENTAL (Luces y Grid) --- */}
      
      {/* Luz Azul Izquierda */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-64 w-[500px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Luz Violeta Derecha */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Sutil */}
      <div className="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- 2. ENCABEZADO GIGANTE --- */}
        <div className="mb-20 md:mb-24">
          <motion.p 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-xs md:text-sm"
          >
            /// Tecnología para Mypes
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight"
          >
            Software diseñado <br />
            para <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">dejar de perder dinero.</span>
          </motion.h2>

          {/* Línea decorativa animada */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 mt-8 rounded-full"
          />
        </div>

        {/* --- 3. TARJETAS (GRID) --- */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, type: "spring", stiffness: 50 }} // Efecto rebote suave
              className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              
              {/* Brillo interno al hacer hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"/>

              {/* Icono Flotante */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border ${item.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <item.icon size={32} />
              </div>

              {/* Títulos */}
              <div className="mb-6 relative z-10">
                 <h4 className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-2">{item.title}</h4>
                 <h3 className="text-3xl md:text-4xl font-black text-white leading-none">{item.headline}</h3>
              </div>
              
              {/* Descripción */}
              <p className="text-blue-100/70 text-base leading-relaxed mb-8 border-b border-white/10 pb-8 relative z-10">
                {item.desc}
              </p>

              {/* Lista de Características (Checklist) */}
              <ul className="space-y-4 mt-auto relative z-10">
                 {item.features.map((feature, fIdx) => (
                    <motion.li 
                      key={fIdx} 
                      className="flex items-center gap-3 text-sm font-medium text-white/90"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (fIdx * 0.1) }} // Aparecen uno por uno
                    >
                       <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                         <Check size={12} strokeWidth={4} />
                       </div>
                       {feature}
                    </motion.li>
                 ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* --- 4. BARRA INFERIOR (Datos Técnicos) --- */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.8 }}
           className="border-t border-white/10 pt-12 flex flex-wrap justify-center md:justify-between gap-6 md:gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500"
        >
           {miniFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3 text-blue-200 transition-colors cursor-default group">
                 <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                    <feat.icon size={18} />
                 </div>
                 <span className="font-semibold text-xs md:text-sm uppercase tracking-wide">{feat.label}</span>
              </div>
           ))}
        </motion.div>

      </div>
    </section>
  );
}