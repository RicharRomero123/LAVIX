"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Emprendedor",
    price: "49",
    desc: "Para lavanderías pequeñas que recién inician.",
    features: ["1 Usuario (Caja)", "Registro de Clientes", "Tickets Digitales", "Soporte por Email"],
    cta: "Comenzar Gratis",
    popular: false
  },
  {
    name: "Profesional",
    price: "89",
    desc: "El favorito. Control total para dueños exigentes.",
    features: ["Usuarios Ilimitados", "Notificaciones WhatsApp", "Control de Caja (Cierre Ciego)", "Reportes Avanzados", "Soporte Prioritario"],
    cta: "Prueba 14 Días",
    popular: true // ESTE ES EL QUE QUEREMOS VENDER
  },
  {
    name: "Cadena / Franquicia",
    price: "199",
    desc: "Para negocios con múltiples sucursales.",
    features: ["Multi-Sucursal Centralizado", "API de Integración", "Gestor de Cuenta Dedicado", "Auditoría de Acciones", "Capacitación Personalizada"],
    cta: "Contactar Ventas",
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="precios" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Planes transparentes</h2>
          <p className="text-xl text-slate-500">Sin comisiones ocultas. Cancela cuando quieras.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-3xl p-8 border-2 flex flex-col ${
                plan.popular ? "border-[#010E9B] shadow-2xl scale-105 z-10" : "border-transparent shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#010E9B] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                  Más Vendido
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-500 uppercase tracking-widest mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-900">S/ {plan.price}</span>
                  <span className="text-slate-400 font-medium">/mes</span>
                </div>
                <p className="text-slate-400 mt-4 text-sm font-medium">{plan.desc}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-1 bg-green-100 rounded-full mt-0.5">
                      <Check size={14} className="text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 font-medium text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.popular 
                ? "bg-[#010E9B] text-white hover:opacity-90 shadow-lg shadow-blue-900/30" 
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}