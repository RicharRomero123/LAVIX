"use client";

import { MessageCircle, Receipt, Smartphone, Check, ArrowRight, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Importamos tus componentes
import { MockupWhatsApp } from "./features/MockupWhatsApp";
import { MockupTicket } from "./features/MockupTicket";
import { MockupDashboard } from "./features/MockupDashboard";

const features = [
  {
    title: "Notificaciones Automáticas",
    headline: "Tu negocio ahora habla por WhatsApp",
    description: "Olvídate de las llamadas perdidas. El sistema envía mensajes automáticos y elegantes a tus clientes en cada etapa del servicio.",
    icon: MessageCircle,
    accent: "from-green-400 to-emerald-600",
    shadow: "shadow-green-500/20",
    iconColor: "text-green-400",
    bullets: [
      { title: "Link de Pago", desc: "Integrado directamente en el chat." },
      { title: "Alertas Reales", desc: "Avisos automáticos de 'Listo' y 'Delivery'." },
      { title: "Cero Spam", desc: "Solo mensajes útiles que el cliente agradece." }
    ],
    component: <MockupWhatsApp />
  },
  {
    title: "Ticket Digital e Impreso",
    headline: "Profesionalismo en cada entrega",
    description: "Genera confianza inmediata. Entrega una boleta digital detallada con código QR que permite al cliente rastrear su pedido sin iniciar sesión.",
    icon: Receipt,
    accent: "from-purple-400 to-indigo-600",
    shadow: "shadow-purple-500/20",
    iconColor: "text-purple-400",
    bullets: [
      { title: "Diseño Limpio", desc: "Fácil de leer en cualquier celular." },
      { title: "QR Tracking", desc: "El cliente ve el estado de su ropa en tiempo real." },
      { title: "Cálculos Automáticos", desc: "Descuentos y promociones aplicados al instante." }
    ],
    component: <MockupTicket />
  },
  {
    title: "Control Remoto",
    headline: "Tu lavandería en tu bolsillo",
    description: "Ya no necesitas estar parado en la caja todo el día. Revisa las métricas clave, el dinero en caja y el rendimiento del personal desde donde estés.",
    icon: Smartphone,
    accent: "from-blue-400 to-cyan-600",
    shadow: "shadow-blue-500/20",
    iconColor: "text-blue-400",
    bullets: [
      { title: "Caja Ciega", desc: "Control total de efectivo vs billeteras digitales." },
      { title: "Control de Stock", desc: "Alertas cuando se acaban los insumos." },
      { title: "En Vivo", desc: "Visualiza las ventas segundo a segundo." }
    ],
    component: <MockupDashboard />
  }
];

export default function Features() {
  return (
    <section className="py-24 md:py-40 bg-[#010E9B] relative overflow-hidden">
      
      {/* --- LUCES DE FONDO --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"/>
          <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px]"/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- ENCABEZADO --- */}
        <div className="mb-32 text-center">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles size={14} className="text-yellow-400 fill-yellow-400 animate-pulse"/>
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Funcionalidades Core</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter"
          >
            Más que un Excel. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200">
              Es tu mano derecha.
            </span>
          </motion.h2>
        </div>

        {/* --- LISTA DE FEATURES --- */}
        <div className="space-y-48">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-20 items-center relative`}
            >
              
              {/* LADO A: TEXTO */}
              <motion.div 
                 initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="flex-1 relative"
              >
                <div className="relative z-10 space-y-8">
                    
                    {/* CABECERA: Icono + Tagline */}
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${feature.shadow} shadow-lg backdrop-blur-sm shrink-0`}>
                            <feature.icon size={24} className={feature.iconColor} />
                        </div>
                        <h4 className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.accent} font-extrabold text-sm uppercase tracking-widest`}>
                            {feature.title}
                        </h4>
                    </div>
                    
                    {/* TITULAR TECNOLÓGICO (Bold + Tracking Tight + Degradado Metálico) */}
                    <div>
                        <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 leading-[1] mb-6 tracking-tighter">
                            {feature.headline}
                        </h3>
                        <p className="text-lg md:text-xl text-blue-100/70 leading-relaxed font-normal">
                            {feature.description}
                        </p>
                    </div>

                    {/* BULLETS LIMPIOS */}
                    <div className="flex flex-col gap-5 pt-4">
                        {feature.bullets.map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-500/30">
                                    <Check size={14} className="text-cyan-400" strokeWidth={4} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-none mb-1 tracking-tight">{item.title}</p>
                                    <p className="text-blue-200/50 text-sm leading-snug font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BOTÓN DE ACCIÓN */}
                    <div className="pt-6">
                        <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 rounded-2xl hover:bg-blue-500 active:scale-95 shadow-lg shadow-blue-900/40">
                            Ver en acción
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
              </motion.div>

              {/* LADO B: COMPONENTE VISUAL */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95, y: 30 }}
                 whileInView={{ opacity: 1, scale: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="flex-1 w-full flex justify-center relative"
              >
                 {/* Halo de luz sutil */}
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr ${feature.accent} opacity-10 rounded-full blur-[100px] -z-10`} />
                 
                 <div className="relative z-10 w-full">
                    {feature.component}
                 </div>
              </motion.div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}