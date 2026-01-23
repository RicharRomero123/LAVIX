"use client";

import { useState } from "react";
import { Check, Minus, HelpCircle, Smartphone, ShieldCheck, Store, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. INTERFACES PARA TYPESCRIPT (Solución a errores de tipado) ---
interface Plan {
  id: string;
  name: string;
  price: string;
  desc: string;
  btn: string;
  popular?: boolean;
}

interface FeatureItem {
  name: string;
  p1: string | boolean;
  p2: string | boolean;
  p3: string | boolean;
  tooltip?: string;
  highlight?: boolean;
}

interface FeatureCategory {
  category: string;
  icon: any;
  items: FeatureItem[];
}

interface FAQItem {
  q: string;
  a: string;
}

export default function PricingTable() {
  const [activePlan, setActivePlan] = useState("crecimiento");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // --- 2. LÓGICA DE CONTACTO (WhatsApp Personalizado) ---
  const handleContact = (planName: string) => {
    const phoneNumber = "51900000000"; // Reemplaza con tu número real
    const message = encodeURIComponent(`Hola LAVIX, deseo activar el Plan ${planName}. ¿Cuáles son los siguientes pasos?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const plans: Plan[] = [
    { id: "esencial", name: "Esencial", price: "49", desc: "Digitaliza tu mostrador hoy.", btn: "bg-blue-800/50 text-blue-100 border border-blue-600" },
    { id: "crecimiento", name: "Crecimiento", price: "89", desc: "Seguridad y control total.", popular: true, btn: "bg-white text-blue-700 font-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105" },
    { id: "expansion", name: "Expansión", price: "199", desc: "Logística y Apps avanzadas.", btn: "bg-blue-800/50 text-blue-100 border border-blue-600 hover:bg-blue-700/50" }
  ];

  const faqs: FAQItem[] = [
    { q: "¿Cómo se realiza el pago?", a: "Aceptamos Yape, Plin, transferencias bancarias y todas las tarjetas de crédito. El cobro es mensual y sin contratos forzosos." },
    { q: "¿Necesito comprar una computadora?", a: "No. Lavix está diseñado para funcionar al 100% desde cualquier smartphone o tablet Android, ahorrándote costos de hardware." },
    { q: "¿Qué pasa si no tengo internet?", a: "Lavix permite realizar registros básicos de manera offline y sincroniza toda la data apenas detecte una conexión estable." }
  ];

  const features: FeatureCategory[] = [
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
    if (typeof value === "boolean") {
      if (value) {
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
      return <Minus size={18} className={`mx-auto ${isPopular ? "text-blue-300" : "text-blue-600 opacity-30"}`} />;
    }
    return <span className={`font-black text-base lg:text-lg ${isPopular ? "text-white" : "text-blue-200"}`}>{value}</span>;
  };

  return (
    <section id="precios" className="py-24 lg:py-40 bg-[#010E9B] relative overflow-hidden text-white font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] h-[1000px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 lg:mb-28">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/30 border border-blue-400/50 text-cyan-300 text-sm font-black uppercase tracking-widest mb-6">
              Inversión Inteligente
            </span>
            <h2 className="text-5xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              El Poder de <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">Evolucionar.</span>
            </h2>
            <p className="text-xl lg:text-3xl text-blue-100 max-w-4xl mx-auto font-medium opacity-90 leading-relaxed px-4">
              Desde una lavandería de barrio hasta una cadena nacional. <br className="hidden lg:block"/> 
              <span className="text-white font-black underline decoration-cyan-500 underline-offset-8">Sin instalaciones costosas</span>, sin complicaciones.
            </p>
          </motion.div>
        </div>

        {/* SELECTOR MÓVIL (Tabs) */}
        <div className="flex lg:hidden bg-blue-950/80 backdrop-blur-sm p-1.5 rounded-3xl mb-12 border border-blue-700 shadow-inner sticky top-4 z-40">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setActivePlan(plan.id)}
              className={`flex-1 py-4 rounded-2xl text-[10px] font-black transition-all uppercase tracking-tighter ${
                activePlan === plan.id ? "bg-blue-600 text-white shadow-xl scale-[1.05]" : "text-blue-500 hover:text-blue-300"
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
                        : "bg-blue-900/20 border-blue-800/50 lg:opacity-60"}`}>
                        
                        <h3 className={`text-2xl font-black tracking-widest mb-4 ${plan.popular ? "text-white" : "text-blue-300"}`}>{plan.name}</h3>
                        <div className="flex items-start justify-center gap-1 mb-4">
                            <span className="text-2xl font-bold mt-4 text-cyan-400">S/</span>
                            <span className="text-8xl font-black">{plan.price}</span>
                        </div>
                        <p className="text-sm font-bold mb-8 opacity-70 h-10 px-4">{plan.desc}</p>
                        <button 
                          onClick={() => handleContact(plan.name)}
                          className={`w-full py-6 rounded-2xl text-base font-black uppercase tracking-widest transition-transform active:scale-95 ${plan.btn}`}
                        >
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
                                <h4 className="text-[10px] lg:text-xs font-black text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-3 bg-blue-900/40 px-3 py-1.5 rounded-lg border border-blue-700/50">
                                    <section.icon size={18}/> {section.category}
                                </h4>
                                <div className="h-px flex-1 bg-gradient-to-r from-blue-800 to-transparent"></div>
                            </div>

                            {section.items.map((item, i) => (
                                <div key={i} className="grid grid-cols-2 lg:grid-cols-4 group hover:bg-blue-500/10 transition-colors rounded-2xl items-center py-5 lg:py-6 px-4">
                                    <div className="px-2 lg:px-10 flex items-center gap-2">
                                        <span className={`text-sm lg:text-lg font-bold ${item.highlight ? "text-cyan-300" : "text-blue-100"}`}>
                                            {item.name}
                                        </span>
                                        {item.tooltip && (
                                          <div className="group/tip relative">
                                            <HelpCircle size={14} className="text-blue-500 cursor-help" />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-3 bg-blue-950 border border-blue-700 text-[10px] text-white rounded-xl opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl leading-relaxed">
                                              {item.tooltip}
                                            </div>
                                          </div>
                                        )}
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

        {/* FAQ SECTION */}
        <div className="mt-40 max-w-4xl mx-auto px-4">
          <h3 className="text-3xl lg:text-5xl font-black text-center mb-16 tracking-tight">Preguntas <span className="text-cyan-400">Frecuentes</span></h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-blue-800/50 rounded-[2.5rem] overflow-hidden bg-blue-900/10 backdrop-blur-md hover:border-blue-600 transition-colors">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-blue-800/20 transition-colors"
                >
                  <span className="text-lg lg:text-xl font-black pr-8">{faq.q}</span>
                  <div className={`shrink-0 p-1 rounded-full border border-blue-700 transition-all duration-300 ${openFaq === i ? "bg-cyan-400 border-cyan-400" : ""}`}>
                    <ChevronDown size={24} className={`${openFaq === i ? "text-blue-900 rotate-180" : "text-blue-400"}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="p-8 pt-0 text-blue-200 text-lg leading-relaxed font-medium">
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