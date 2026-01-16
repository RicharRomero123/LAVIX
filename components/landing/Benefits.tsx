"use client";

import { ShieldAlert, Clock, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: ShieldAlert,
    color: "bg-rose-100 text-rose-600",
    title: "Adiós al Robo Hormiga",
    desc: "Blindaje total de caja. Si la máquina trabaja, el ticket se genera automáticamente."
  },
  {
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
    title: "Orden en Planta",
    desc: "Olvídate de buscar prendas perdidas. Trazabilidad completa con etiquetas QR."
  },
  {
    icon: Smartphone,
    color: "bg-blue-100 text-blue-600",
    title: "Notificaciones WhatsApp",
    desc: "Avisa a tus clientes automáticamente cuando su ropa esté lista para recoger."
  }
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">¿Por qué LAVIX?</h2>
          <p className="text-slate-500 mt-4">Resolvemos los dolores reales de tu lavandería.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}