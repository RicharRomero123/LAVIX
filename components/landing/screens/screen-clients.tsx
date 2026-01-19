"use client";

import { useState } from "react";
import { Scale, Shirt, Plus, Minus, ChevronRight, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Datos simulados del catálogo
// Datos simulados del catálogo
const CATALOG = [
  { id: 1, name: "Terno Completo", price: 22.00, icon: "👔" },
  { id: 2, name: "Zapatillas", price: 18.00, icon: "👟" }, // ¡Nuevo!
  { id: 3, name: "Edredón 2 Plz", price: 28.00, icon: "🛏️" },
  { id: 4, name: "Cama de Mascota", price: 35.00, icon: "🐶" }, // ¡Nuevo!
  { id: 5, name: "Casaca Plumas", price: 20.00, icon: "🧥" },
  { id: 6, name: "Colcha / Frazada", price: 22.00, icon: "🧶" }, // ¡Nuevo!
  { id: 7, name: "Camisa / Blusa", price: 8.00, icon: "👕" },
  { id: 8, name: "Vestido de Noche", price: 35.00, icon: "👗" }, // ¡Nuevo!
  { id: 9, name: "Cortinas (Juego)", price: 18.00, icon: "🪟" }, // ¡Nuevo!
  { id: 10, name: "Pantalón Jean", price: 9.00, icon: "👖" }, // ¡Nuevo!
];

export const ScreenPOS = () => {
  const [activeTab, setActiveTab] = useState<'weight' | 'item'>('weight');
  
  // Estado para Peso
  const [weight, setWeight] = useState(4.5);
  const pricePerKg = 4.00;

  // Estado para Prendas (Carrito)
  const [quantities, setQuantities] = useState<Record<number, number>>({
     2: 1, // Empezamos con 1 camisa seleccionada para que no se vea vacío
  });

  // Manejadores
  const handleWeight = (amount: number) => {
    setWeight((prev) => Math.max(0.5, prev + amount));
  };

  const updateQty = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + delta);
      const newState = { ...prev, [id]: newQty };
      if (newQty === 0) delete newState[id]; // Limpiar si es 0
      return newState;
    });
  };

  // Cálculo del Total
  const calculateTotal = () => {
    if (activeTab === 'weight') {
      return weight * pricePerKg;
    } else {
      return Object.entries(quantities).reduce((total, [id, qty]) => {
        const item = CATALOG.find(p => p.id === Number(id));
        return total + (item ? item.price * qty : 0);
      }, 0);
    }
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col font-sans select-none">
      
      {/* Header */}
      <div className="bg-violet-600 p-5 pt-8 shadow-lg relative z-10 flex justify-between items-center transition-colors duration-300">
        <div>
           <p className="text-violet-200 text-[10px] font-bold uppercase tracking-wider">Nuevo Pedido</p>
           <p className="text-white font-bold text-lg flex items-center gap-2">
             {activeTab === 'weight' ? <Scale size={18}/> : <LayoutGrid size={18}/>} 
             {activeTab === 'weight' ? "Recepción x Kg" : "Por Prenda"}
           </p>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
           <span className="text-white font-bold text-xs">#0452</span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="bg-white p-2 flex gap-2 shadow-sm z-0 relative">
         <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('weight'); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'weight' ? 'bg-violet-50 text-violet-700 border border-violet-100 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
         >
            <Scale size={14}/> Por Kilo
         </button>
         <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('item'); }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'item' ? 'bg-violet-50 text-violet-700 border border-violet-100 shadow-sm' : 'text-slate-400 hover:bg-slate-50'}`}
         >
            <Shirt size={14}/> Por Prenda
         </button>
      </div>

      {/* Contenido Cambiante */}
      <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
         
         <AnimatePresence mode="wait">
            {activeTab === 'weight' ? (
                /* --- VISTA PESO --- */
                <motion.div 
                    key="weight-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-4 flex-1"
                >
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-4 flex-1">
                        <p className="text-slate-400 text-xs font-bold uppercase">Peso (Kg)</p>
                        
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleWeight(-0.5); }}
                                className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 active:scale-90 transition-all"
                            >
                                <Minus size={20}/>
                            </button>

                            <div className="text-5xl font-black text-slate-800 tracking-tighter w-32 text-center">
                                {weight.toFixed(1)}
                            </div>

                            <button 
                                onClick={(e) => { e.stopPropagation(); handleWeight(0.5); }}
                                className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 active:scale-90 transition-all"
                            >
                                <Plus size={20}/>
                            </button>
                        </div>

                        <div className="flex gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">Lavado</span>
                            <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full border border-orange-100">Secado</span>
                        </div>
                    </div>
                </motion.div>
            ) : (
                /* --- VISTA PRENDAS (CATÁLOGO) --- */
                <motion.div 
                    key="item-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-2 flex-1 overflow-y-auto pr-1"
                >
                    {CATALOG.map((product) => {
                        const qty = quantities[product.id] || 0;
                        return (
                            <div key={product.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${qty > 0 ? 'bg-violet-50 border-violet-200' : 'bg-white border-slate-100'}`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{product.icon}</span>
                                    <div>
                                        <p className="text-slate-800 font-bold text-xs">{product.name}</p>
                                        <p className="text-slate-400 text-[10px] font-bold">S/ {product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {qty > 0 && (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); updateQty(product.id, -1); }}
                                            className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-red-50 hover:text-red-500 active:scale-90 transition-all"
                                        >
                                            <Minus size={12}/>
                                        </button>
                                    )}
                                    <span className={`text-sm font-bold w-4 text-center ${qty > 0 ? 'text-violet-700' : 'text-slate-300'}`}>{qty}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); updateQty(product.id, 1); }}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center active:scale-90 transition-all ${qty > 0 ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                                    >
                                        <Plus size={12}/>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    {/* Espacio extra para scroll */}
                    <div className="h-4"/> 
                </motion.div>
            )}
         </AnimatePresence>

         {/* Footer: Total Dinámico */}
         <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-xl flex justify-between items-center group cursor-pointer hover:bg-slate-800 transition-colors mt-auto z-10">
            <div>
               <p className="text-slate-400 text-[10px] font-bold uppercase">Total a Cobrar</p>
               <motion.p 
                 key={calculateTotal()} // Animar cambio de número
                 initial={{ scale: 1.2, color: "#a78bfa" }}
                 animate={{ scale: 1, color: "#ffffff" }}
                 className="text-2xl font-black"
               >
                 S/ {calculateTotal().toFixed(2)}
               </motion.p>
            </div>
            <div className="w-10 h-10 bg-violet-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/30">
               <ChevronRight size={24} className="text-white"/>
            </div>
         </div>

      </div>
    </div>
  );
};