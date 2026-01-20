"use client";

import { Check, Minus, HelpCircle, Smartphone, Zap, ShieldCheck, Store, Star } from "lucide-react";
import { motion } from "framer-motion";

// --- TIPOS ---
type Plan = {
  id: string;
  name: string;
  price: string;
  desc: string;
  btn: string;
  popular?: boolean;
};

type FeatureItem = {
  name: string;
  p1: string | boolean;
  p2: string | boolean;
  p3: string | boolean;
  tooltip?: string;
  highlight?: boolean;
};

type FeatureCategory = {
  category: string;
  icon: any;
  items: FeatureItem[];
};

export default function PricingTable() {
  
  const plans: Plan[] = [
    {
      id: "esencial",
      name: "Esencial",
      price: "49",
      desc: "Para iniciar ordenado.",
      btn: "bg-blue-800/50 text-blue-100 hover:bg-blue-700/50 border border-blue-600"
    },
    {
      id: "crecimiento",
      name: "Crecimiento",
      price: "89",
      desc: "Control total y seguridad.",
      popular: true,
      // Botón Cian Eléctrico
      btn: "bg-white text-blue-700 hover:bg-cyan-50 font-black shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
    },
    {
      id: "expansion",
      name: "Expansión",
      price: "199",
      desc: "Logística y Apps.",
      btn: "bg-blue-800/50 text-blue-100 hover:bg-blue-700/50 border border-blue-600"
    }
  ];

  const features: FeatureCategory[] = [
    {
      category: "Punto de Venta",
      icon: Store,
      items: [
        { name: "Usuarios Sistema", p1: "1 (Admin)", p2: "Ilimitados", p3: "Ilimitados" },
        { name: "Tickets de Venta", p1: true, p2: true, p3: true },
        { name: "Registro Clientes", p1: true, p2: true, p3: true },
      ]
    },
    {
      category: "Control y Seguridad",
      icon: ShieldCheck,
      items: [
        { name: "Roles y Permisos", p1: false, p2: true, p3: true, tooltip: "Cuentas limitadas para empleados." },
        { name: "Cierre de Caja Ciego", p1: false, p2: true, p3: true, tooltip: "El cajero no ve el total esperado." },
        { name: "Alertas WhatsApp", p1: false, p2: true, p3: true },
      ]
    },
    {
      category: "Tecnología Avanzada",
      icon: Smartphone,
      items: [
        { name: "Reportes Excel", p1: false, p2: true, p3: true },
        { name: "App Motorizados", p1: false, p2: false, p3: true, highlight: true },
        { name: "Multi-Sucursal", p1: false, p2: false, p3: true },
      ]
    }
  ];

  // Renderizado de celdas (Checks y Textos)
  const renderCell = (value: string | boolean | undefined, highlight: boolean = false, isPopular: boolean = false) => {
    if (value === true) {
      return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto shadow-lg ${
            isPopular 
            ? "bg-white text-blue-600 shadow-[0_0_15px_rgba(255,255,255,0.5)]" // Check Blanco en columna azul
            : highlight 
                ? "bg-cyan-400 text-blue-900" 
                : "bg-blue-800 text-cyan-300 border border-blue-600"
        }`}>
          <Check size={20} strokeWidth={4} />
        </div>
      );
    }
    if (value === false) {
      return <Minus size={20} className={`mx-auto ${isPopular ? "text-blue-300" : "text-blue-600"}`} />;
    }
    // Texto de celdas (ej: "Ilimitados")
    return <span className={`font-black text-lg ${isPopular ? "text-white" : "text-blue-200"}`}>{value}</span>;
  };

  return (
    <section id="precios" className="py-32 bg-[#010E9B] relative overflow-hidden">
      
      {/* Fondo de Luces (Solo azules y cianes) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1500px] h-[1000px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg"
          >
            Precios Claros. <br className="lg:hidden"/>
            <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
              Sin Sorpresas.
            </span>
          </motion.h2>
          <p className="text-2xl text-blue-100 max-w-3xl mx-auto font-medium opacity-80">
             Escala tu tecnología a medida que crece tu negocio.
          </p>
        </div>

        {/* --- TABLA GIGANTE --- */}
        <div className="overflow-visible pb-12 hide-scrollbar">
          <div className="min-w-[1000px] w-full">
            
            {/* 1. CABECERA DE PLANES */}
            <div className="grid grid-cols-4 relative mb-0 items-end">
                <div className="p-6"></div> {/* Espacio vacío */}

                {plans.map((plan) => (
                    <motion.div 
                        key={plan.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        // COLUMNA DESTACADA: AZUL REY BRILLANTE (bg-blue-600)
                        className={`p-8 text-center relative flex flex-col items-center rounded-t-[2rem] border-t border-x transition-all duration-300 ${
                            plan.popular 
                            ? "bg-blue-600 border-cyan-300/50 -mt-16 pt-16 z-20 shadow-[0_-20px_60px_rgba(37,99,235,0.5)] pb-10" 
                            : "bg-transparent border-transparent pt-0 pb-8 opacity-70 hover:opacity-100"
                    }`}>
                        
                        
                        <h3 className={`text-2xl font-black uppercase tracking-widest mb-2 ${plan.popular ? "text-white" : "text-blue-300"}`}>
                            {plan.name}
                        </h3>
                        
                        {/* PRECIOS GIGANTES */}
                        <div className="flex items-start justify-center gap-1 my-4">
                            <span className={`text-2xl font-bold mt-4 ${plan.popular ? "text-blue-200" : "text-blue-400"}`}>S/</span>
                            <span className={`text-7xl font-black tracking-tighter ${
                                plan.popular 
                                ? "text-white drop-shadow-xl" 
                                : "text-white/80"
                            }`}>
                                {plan.price}
                            </span>
                        </div>
                        
                        <p className={`text-sm font-bold mb-8 h-4 ${plan.popular ? "text-blue-100" : "text-blue-300"}`}>{plan.desc}</p>
                        
                        <button className={`w-full py-5 rounded-2xl text-base font-black transition-all uppercase tracking-wide ${plan.btn}`}>
                            Elegir {plan.name}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* 2. CUERPO DE LA TABLA */}
            <div className="relative">
                {/* FONDO COLUMNA POPULAR (AZUL REY CONTINUO) */}
                <div className="absolute inset-0 grid grid-cols-4 pointer-events-none">
                    <div></div>
                    <div></div>
                    {/* El pilar central AZUL REY */}
                    <div className="bg-blue-600 border-x border-cyan-300/30 h-full w-full shadow-[0_0_50px_rgba(37,99,235,0.3)]"></div>
                    <div></div>
                </div>

                <div className="space-y-8 relative z-10 pt-4">
                    {features.map((section, idx) => (
                        <div key={idx}>
                            {/* Categoría */}
                            <div className="px-8 py-5 mb-4 flex items-center gap-4">
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-blue-700 to-transparent"></div>
                                <h4 className="text-sm font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
                                    <section.icon size={20}/>
                                    {section.category}
                                </h4>
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-blue-700 to-transparent"></div>
                            </div>

                            {/* Items */}
                            {section.items.map((item, i) => (
                                <div key={i} className="grid grid-cols-4 group hover:bg-white/5 transition-colors rounded-xl items-center py-5">
                                    
                                    {/* Nombre de la característica */}
                                    <div className="px-8 flex items-center gap-3">
                                        <span className={`text-lg font-bold ${item.highlight ? "text-cyan-300" : "text-blue-100"}`}>
                                            {item.name}
                                        </span>
                                        {item.tooltip && (
                                            <div className="group/tooltip relative">
                                                <HelpCircle size={18} className="text-blue-500 hover:text-cyan-400 cursor-help transition-colors"/>
                                                {/* Tooltip Azul, no negro */}
                                                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-56 bg-blue-800 border border-blue-500 text-white text-xs font-medium p-3 rounded-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-2xl">
                                                    {item.tooltip}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Valores */}
                                    <div className="flex items-center justify-center">
                                        {renderCell(item.p1, false, false)}
                                    </div>
                                    
                                    {/* Celda Central (Popular) */}
                                    <div className="flex items-center justify-center">
                                        {renderCell(item.p2, false, true)}
                                    </div>
                                    
                                    <div className="flex items-center justify-center">
                                        {renderCell(item.p3, item.highlight, false)}
                                    </div>

                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. FOOTER (Cierre Azul Rey) */}
            <div className="grid grid-cols-4 relative z-10">
                <div></div>
                <div></div>
                <div className="h-8 bg-blue-600 rounded-b-[2rem] border-x border-b border-cyan-300/30 shadow-2xl"></div>
                <div></div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}