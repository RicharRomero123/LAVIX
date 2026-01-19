"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "¿Necesito comprar equipos especiales?", a: "No. LAVIX funciona en cualquier computadora, laptop o tablet que ya tengas. Solo necesitas internet." },
  { q: "¿Es difícil de aprender?", a: "Diseñamos LAVIX pensando en personas que no son expertas en tecnología. Si sabes usar Facebook, sabes usar LAVIX. Incluimos videos tutoriales." },
  { q: "¿Puedo probarlo antes de pagar?", a: "¡Sí! Tienes 14 días gratis con todas las funciones activas para que veas cómo mejora tu negocio. Sin compromiso." },
  { q: "¿Qué pasa si se va el internet?", a: "No pierdes datos. Puedes seguir registrando en papel momentáneamente y al volver la conexión, ingresas todo rápido. Estamos trabajando en modo offline." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Preguntas Frecuentes</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="font-bold text-slate-800 text-lg">{faq.q}</span>
                {openIndex === idx ? <Minus className="text-[#010E9B]"/> : <Plus className="text-slate-400"/>}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-6 pt-0 text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}