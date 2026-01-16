"use client";

import { useState } from "react";
import { Zap, ShieldCheck, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<"recepcion" | "caja" | "dueño">("recepcion");

  const tabs = [
    { id: "recepcion", label: "Recepción", icon: Zap, color: "lavix" },
    { id: "caja", label: "Caja Anti-Robo", icon: ShieldCheck, color: "rose" },
    { id: "dueño", label: "Panel Dueño", icon: TrendingUp, color: "cyan" },
  ];

  return (
    <section id="demo" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* IZQUIERDA: MENÚ */}
          <div className="w-full lg:w-1/3 space-y-4">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Todo en un solo lugar</h2>
            
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative w-full text-left p-4 rounded-2xl transition-all group ${
                  activeTab === tab.id ? "bg-white shadow-lg" : "hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`p-3 rounded-xl ${
                    activeTab === tab.id 
                    ? (tab.color === "rose" ? "bg-rose-500 text-white" : tab.color === "cyan" ? "bg-cyan-500 text-white" : "bg-lavix-600 text-white")
                    : "bg-slate-100 text-slate-400"
                  }`}>
                    <tab.icon size={20} />
                  </div>
                  <span className={`font-bold text-lg ${activeTab === tab.id ? "text-slate-900" : "text-slate-500"}`}>
                    {tab.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* DERECHA: MOCKUP */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2.5rem] p-4 shadow-2xl border border-slate-100 ring-8 ring-white/50 h-[500px] relative overflow-hidden">
              <div className="w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden flex flex-col relative">
                
                {/* Header Mockup */}
                <div className="h-14 bg-white border-b border-slate-100 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                </div>

                {/* Contenido Animado */}
                <div className="flex-1 flex items-center justify-center p-8">
                  <AnimatePresence mode="wait">
                    
                    {activeTab === "recepcion" && (
                      <motion.div 
                        key="recepcion"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="text-center"
                      >
                        <div className="w-20 h-20 bg-lavix-100 rounded-full flex items-center justify-center mx-auto mb-4 text-lavix-600">
                          <Zap size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Nueva Orden #001</h3>
                        <p className="text-slate-400">Registrando prendas...</p>
                      </motion.div>
                    )}

                    {activeTab === "caja" && (
                      <motion.div 
                        key="caja"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-xs bg-white p-6 rounded-2xl shadow-lg border border-rose-100"
                      >
                        <div className="flex justify-between mb-4">
                          <span className="font-bold text-slate-400 text-xs">CAJA</span>
                          <ShieldCheck size={16} className="text-rose-500"/>
                        </div>
                        <div className="text-3xl font-black text-slate-800">S/ 1,500.00</div>
                        <div className="text-right text-xs font-bold text-rose-500 mt-2">Cuadre Pendiente</div>
                      </motion.div>
                    )}

                    {activeTab === "dueño" && (
                      <motion.div 
                        key="dueño"
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                        className="w-full max-w-sm space-y-4"
                      >
                        <div className="bg-lavix-600 p-6 rounded-2xl text-white shadow-lg">
                          <p className="text-sm opacity-80">Ventas del día</p>
                          <p className="text-3xl font-black">S/ 840.50</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-100">
                          <p className="text-xs font-bold text-slate-400">PEDIDOS</p>
                          <div className="h-2 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: "70%" }} 
                              className="h-full bg-cyan-500" 
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}