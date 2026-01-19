"use client";

import Image from "next/image";
import { MessageCircle, Printer, Smartphone, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Notificaciones Automáticas",
    description: "Olvídate de llamar clientes. LAVIX envía un WhatsApp automático cuando la ropa está lista. Ahorra tiempo y moderniza tu servicio.",
    icon: MessageCircle,
    color: "bg-green-100 text-green-600",
    image: "/assets/feature-whatsapp.png" // Tendrás que crear esta imagen luego
  },
  {
    title: "Ticket Digital e Impreso",
    description: "Genera tickets profesionales con código QR. Tu cliente recibe el detalle en su celular y tú etiquetas las prendas para no perderlas jamás.",
    icon: Printer,
    color: "bg-blue-100 text-blue-600",
    image: "/assets/feature-ticket.png"
  },
  {
    title: "Control Remoto Total",
    description: "¿Estás de viaje? Mira en tiempo real cuántos kilos entraron, cuánto dinero hay en caja y qué empleado está trabajando.",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-600",
    image: "/assets/feature-dashboard.png"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Más que un sistema, tu mano derecha</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Herramientas diseñadas específicamente para resolver el caos operativo de una lavandería.
          </p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
            >
              {/* TEXTO */}
              <div className="flex-1 space-y-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color}`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {["Fácil de usar", "Sin instalación compleja", "Soporte incluido"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#010E9B]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* IMAGEN (MOCKUP) */}
              <div className="flex-1 w-full bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-xl">
                 {/* Aquí iría una captura de tu sistema, por ahora un placeholder elegante */}
                 <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden group">
                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Vista del Sistema</span>
                    {/* Cuando tengas las fotos, descomenta esto:
                    <Image src={feature.image} alt={feature.title} fill className="object-cover" /> 
                    */}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}