"use client";
import { useState } from "react";
import { Plus, Minus, MessageCircle, HelpCircle, WifiOff, ShieldCheck, Printer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { 
    q: "¿Necesito internet para usar LAVIX?", 
    a: "Sí. LAVIX es un sistema 100% en la nube. Esto es lo que te permite ver tus ventas en tiempo real desde tu casa o celular. Si falla tu WiFi, el sistema es tan ligero que puedes compartir datos de tu celular y seguir trabajando sin problemas." 
  },
  { 
    q: "¿Qué tipo de impresora necesito?", 
    a: "¡La que tú quieras! No te obligamos a comprar equipos costosos. LAVIX es compatible con cualquier impresora térmica genérica (USB, Bluetooth o WiFi) de 58mm o 80mm que funcione con Windows o Android." 
  },
  { 
    q: "¿Es difícil de aprender para mi personal?", 
    a: "Para nada. Lo diseñamos pensando en la rotación de personal. Es tan fácil como usar una App de delivery. Además, incluimos videos cortos de capacitación para que tus nuevos empleados aprendan en 10 minutos." 
  },
  { 
    q: "¿Mis datos están seguros?", 
    a: "Más seguros que en tu computadora. Usamos servidores de AWS (Amazon), los mismos que usan los bancos modernos. Hacemos copias de seguridad automáticas todos los días para que nunca pierdas tu información por un virus o robo de PC." 
  },
  { 
    q: "¿Tengo que firmar un contrato a largo plazo?", 
    a: "No. Creemos en la libertad. El servicio es prepago mensual (como Netflix). Puedes cancelar cuando quieras sin penalidades ni explicaciones. Si no te sirve, no pagas." 
  },
  { 
    q: "¿Tengo muchos clientes en Excel, los puedo pasar?", 
    a: "Sí. Si tienes una lista de clientes, te ayudamos a importarlos masivamente al sistema para que no tengas que digitarlos uno por uno. Queremos que arranques rápido." 
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#010E9B] relative overflow-hidden">
      
      {/* --- LUCES AMBIENTALES (FONDO) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4 backdrop-blur-md"
          >
             <HelpCircle size={16} /> Centro de Ayuda
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Preguntas Frecuentes
          </motion.h2>
          <p className="text-xl text-blue-200/60 max-w-2xl mx-auto font-medium">
            Todo lo que necesitas saber antes de empezar.
          </p>
        </div>
        
        {/* ACORDEÓN (ESTILO CRISTAL) */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                key={idx} 
                className={`group rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                    openIndex === idx 
                    ? "bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]" 
                    : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className={`text-lg font-bold transition-colors ${
                    openIndex === idx ? "text-white" : "text-blue-200/80 group-hover:text-white"
                }`}>
                    {faq.q}
                </span>
                
                {/* Icono animado */}
                <div className={`p-2 rounded-full transition-all duration-300 ${
                    openIndex === idx 
                    ? "bg-cyan-400 text-[#010E9B] rotate-180" 
                    : "bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white"
                }`}>
                    {openIndex === idx ? <Minus size={20}/> : <Plus size={20}/>}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-blue-200/70 leading-relaxed text-base border-t border-white/5 mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA FINAL DE SOPORTE (CARD CRISTAL) */}
        <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center bg-[#0B225C] p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group max-w-lg mx-auto w-full">
                
                {/* Efecto de brillo al pasar el mouse */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">¿Dudas sobre la instalación?</h3>
                <p className="text-blue-200/60 mb-8 relative z-10 px-4">
                    Nuestro equipo técnico te ayuda a configurar tus impresoras y usuarios en una videollamada.
                </p>
                
                <button className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#20bd5a] transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-105 transform duration-200 relative z-10">
                    <MessageCircle size={22} fill="white" />
                    Hablar con un Asesor
                </button>
            </div>
        </div>

      </div>
    </section>
  );
}