"use client";

import { useState } from "react";
import { Check, Minus, HelpCircle, Smartphone, ShieldCheck, Store, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingTable() {
  const [activePlan, setActivePlan] = useState("crecimiento");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    { id: "esencial", name: "Esencial", price: "49", desc: "Digitaliza tu mostrador hoy.", btn: "bg-blue-800/50 text-blue-100 border border-blue-600" },
    { id: "crecimiento", name: "Crecimiento", price: "89", desc: "Seguridad y control total.", popular: true, btn: "bg-white text-blue-700 font-black" },
    { id: "expansion", name: "Expansión", price: "199", desc: "Logística y Apps avanzadas.", btn: "bg-blue-800/50 text-blue-100 border border-blue-600" }
  ];

  const faqs = [
    { q: "¿Cómo se realiza el pago?", a: "Aceptamos Yape, Plin, transferencias bancarias y todas las tarjetas de crédito. El cobro es mensual y sin contratos forzosos." },
    { q: "¿Necesito comprar una computadora?", a: "No. Lavix está diseñado para funcionar al 100% desde cualquier smartphone o tablet Android, ahorrándote costos de hardware." },
    { q: "¿Qué pasa si no tengo internet?", a: "Lavix permite realizar registros básicos de manera offline y sincroniza toda la data apenas detecte una conexión estable." }
  ];

  const features = [
    {
      category: "Gestión de Negocio",
      icon: Store,
      items: [
        { name: "Usuarios Administrativos", p1: "1 Acceso", p2: "Ilimitados", p3: "Ilimitados" },
        { name: "Tickets Digitales Ilimitados", p1: true, p2: true, p3: true },
        { name: "Base de Datos de Clientes", p1: true, p2: true, p3: true },
      ]
    },
    {
      category: "Blindaje y Seguridad",
      icon: ShieldCheck,
      items: [
        { name: "Evidencia Digital (Fotos)", p1: false, p2: true, p3: true, tooltip: "Fotos obligatorias al recibir prendas para evitar reclamos." },
        { name: "Arqueo de Caja Ciego", p1: false, p2: true, p3: true, tooltip: "Tus empleados no ven el saldo hasta cerrar la caja." },
        { name: "Alertas de Auditoría", p1: false, p2: true, p3: true },
      ]
    },
    {
      category: "Logística Avanzada",
      icon: Smartphone,
      items: [
        { name: "Reportes Gerenciales", p1: false, p2: true, p3: true },
        { name: "App para Motorizados", p1: false, p2: false, p3: true, highlight: true },
        { name: "Soporte Multi-Sede", p1: false, p2: false, p3: true },
      ]
    }
  ];

  const renderCell = (value: string | boolean | undefined, highlight: boolean = false, isPopular: boolean = false) => {
    if (value === true) {
      return (
        <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mx-auto shadow-lg ${
            isPopular ? "bg-white text-blue-600 shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
            : highlight ? "bg-cyan-400 text-blue-900" 
            : "bg-blue-800 text-cyan-300 border border-blue-600"
        }`}>
          <Check size={18} strokeWidth={4} />
        </div>
      );
    }
    if (value === false) {
      return <Minus size={18} className={`mx-auto ${isPopular ? "text-blue-300" : "text-blue-600"}`} />;
    }
    return <span className={`font-black text-base lg:text-lg ${isPopular ? "text-white" : "text-blue-200"}`}>{value}</span>;
  };

  return (
    <section id="precios" className="py-24 lg:py-40 bg-[#010E9B] relative overflow-hidden text-white font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] h-[1000px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 relative z-10">
        
        {/* HEADER GIGANTE Y LLAMATIVO */}
        <div className="text-center mb-16 lg:mb-28">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/30 border border-blue-400/50 text-cyan-300 text-sm font-black uppercase tracking-widest mb-6">
              Inversión Inteligente
            </span>
            <h2 className="text-5xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              El Poder de <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">Evolucionar.</span>
            </h2>
            <p className="text-xl lg:text-3xl text-blue-100 max-w-4xl mx-auto font-medium opacity-90 leading-relaxed">
              Desde una lavandería de barrio hasta una cadena nacional. <br className="hidden lg:block"/> 
              <span className="text-white font-black underline decoration-cyan-500 underline-offset-8">Sin instalaciones costosas</span>, sin complicaciones.
            </p>
          </motion.div>
        </div>

        {/* SELECTOR MÓVIL (Tabs) */}
        <div className="flex lg:hidden bg-blue-900/50 p-1.5 rounded-3xl mb-12 border border-blue-700 shadow-inner">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActivePlan(plan.id)}
              className={`flex-1 py-4 rounded-2xl text-[10px] font-black transition-all uppercase tracking-tighter ${
                activePlan === plan.id ? "bg-blue-600 text-white shadow-xl scale-[1.05]" : "text-blue-400"
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {/* TABLA DE COMPARACIÓN */}
        <div className="overflow-x-auto lg:overflow-visible pb-12 hide-scrollbar">
          <div className="min-w-full lg:min-w-[1000px]">
            
            {/* CABECERA PLANES */}
            <div className="grid grid-cols-1 lg:grid-cols-4 items-end">
                <div className="hidden lg:block p-8"></div>
                {plans.map((plan) => (
                    <div key={plan.id} className={`p-8 text-center flex-col rounded-t-[2.5rem] border-t border-x transition-all duration-500 
                        ${activePlan === plan.id ? "flex" : "hidden lg:flex"}
                        ${plan.popular ? "bg-blue-600 border-cyan-400/40 lg:-mt-20 lg:pt-20 z-20 shadow-[0_-30px_70px_rgba(37,99,235,0.6)] pb-12" 
                        : "bg-transparent border-transparent lg:opacity-60"}`}>
                        
                        <h3 className={`text-2xl font-black tracking-widest mb-4 ${plan.popular ? "text-white" : "text-blue-300"}`}>{plan.name}</h3>
                        <div className="flex items-start justify-center gap-1 mb-4">
                            <span className="text-2xl font-bold mt-4 text-cyan-400">S/</span>
                            <span className="text-8xl font-black">{plan.price}</span>
                        </div>
                        <p className="text-sm font-bold mb-8 opacity-70 h-10">{plan.desc}</p>
                        <button className={`w-full py-6 rounded-2xl text-base font-black uppercase tracking-widest transition-transform hover:scale-105 ${plan.btn}`}>
                            Activar {plan.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* CUERPO CARACTERÍSTICAS */}
            <div className="relative">
                <div className="absolute inset-0 hidden lg:grid grid-cols-4 pointer-events-none">
                    <div></div><div></div>
                    <div className="bg-blue-600 border-x border-cyan-400/30 h-full w-full shadow-2xl"></div>
                    <div></div>
                </div>

                <div className="space-y-4 lg:space-y-6 relative z-10 pt-8">
                    {features.map((section, idx) => (
                        <div key={idx}>
                            <div className="px-6 py-6 mb-4 flex items-center gap-6">
                                <h4 className="text-[10px] lg:text-xs font-black text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <section.icon size={20}/> {section.category}
                                </h4>
                                <div className="h-px flex-1 bg-blue-800"></div>
                            </div>

                            {section.items.map((item, i) => (
                                <div key={i} className="grid grid-cols-2 lg:grid-cols-4 group hover:bg-blue-500/10 transition-colors rounded-2xl items-center py-5 lg:py-6">
                                    <div className="px-6 lg:px-10 flex items-center gap-2">
                                        <span className={`text-sm lg:text-lg font-bold ${item.highlight ? "text-cyan-300" : "text-blue-50"}`}>
                                            {item.name}
                                        </span>
                                    </div>

                                    <div className={`justify-center ${activePlan === 'esencial' ? 'flex' : 'hidden lg:flex'}`}>{renderCell(item.p1)}</div>
                                    <div className={`justify-center ${activePlan === 'crecimiento' ? 'flex' : 'hidden lg:flex'}`}>{renderCell(item.p2, false, true)}</div>
                                    <div className={`justify-center ${activePlan === 'expansion' ? 'flex' : 'hidden lg:flex'}`}>{renderCell(item.p3, item.highlight)}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden lg:grid grid-cols-4 relative z-10">
                <div></div><div></div>
                <div className="h-12 bg-blue-600 rounded-b-[3rem] border-x border-b border-cyan-400/40 shadow-2xl"></div>
                <div></div>
            </div>
          </div>
        </div>

        {/* --- FAQ SECTION --- */}
        <div className="mt-40 max-w-4xl mx-auto">
          <h3 className="text-3xl lg:text-5xl font-black text-center mb-16 italic">Preguntas <span className="text-cyan-400">Frecuentes</span></h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-blue-800 rounded-3xl overflow-hidden bg-blue-900/20 backdrop-blur-sm">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-blue-800/30 transition-colors"
                >
                  <span className="text-lg lg:text-xl font-black">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === i ? "rotate-180 text-cyan-400" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-8 pt-0 text-blue-200 text-lg leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}