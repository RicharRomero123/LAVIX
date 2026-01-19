"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, Wallet, CreditCard, PieChart, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScreenFinance = () => {
  const [view, setView] = useState<'day' | 'month'>('day');

  // Datos simulados para interactividad
  const data = {
    day: {
      balance: "850.50",
      cash: "320.00",
      digital: "530.50",
      expenses: "120.00",
      transactions: [
        { id: 1, title: "Lavado Edredones", time: "10:42 AM", amount: "+45.00", type: "income", method: "Yape" },
        { id: 2, title: "Servicio Express", time: "09:15 AM", amount: "+18.00", type: "income", method: "Efectivo" },
        { id: 3, title: "Compra Suavizante", time: "08:30 AM", amount: "-65.00", type: "expense", method: "Caja" },
        { id: 4, title: "Terno Completo", time: "Yesterday", amount: "+22.00", type: "income", method: "Tarjeta" },
      ]
    },
    month: {
      balance: "12,450.00",
      cash: "4,200.00",
      digital: "8,250.00",
      expenses: "3,100.00",
      transactions: [
        { id: 1, title: "Pago Alquiler", time: "01 Ene", amount: "-1,200.00", type: "expense", method: "Banco" },
        { id: 2, title: "Cierre Semanal", time: "28 Dic", amount: "+3,400.00", type: "income", method: "Mixto" },
        { id: 3, title: "Mant. Lavadoras", time: "15 Dic", amount: "-450.00", type: "expense", method: "Transferencia" },
      ]
    }
  };

  const currentData = data[view];

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col font-sans select-none">
      
      {/* Header Oscuro con Balance */}
      <div className="bg-slate-900 p-5 pt-8 pb-6 shadow-xl relative z-10 rounded-b-[2rem]">
        
        {/* Switcher Dia/Mes */}
        <div className="flex justify-center mb-4">
           <div className="bg-slate-800 p-1 rounded-full flex gap-1 border border-slate-700">
              <button 
                onClick={(e) => {e.stopPropagation(); setView('day')}}
                className={`px-4 py-1 rounded-full text-[10px] font-bold transition-all ${view === 'day' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Hoy
              </button>
              <button 
                onClick={(e) => {e.stopPropagation(); setView('month')}}
                className={`px-4 py-1 rounded-full text-[10px] font-bold transition-all ${view === 'month' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Este Mes
              </button>
           </div>
        </div>

        <div className="text-center">
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Balance Neto</p>
            <motion.p 
                key={view} // Animar cambio
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white font-black text-4xl tracking-tight"
            >
                S/ {currentData.balance}
            </motion.p>
        </div>

        {/* Mini Gráfico de Barras (Decorativo) */}
        <div className="flex justify-center items-end gap-2 h-8 mt-4 opacity-50">
            <div className="w-2 bg-blue-500 rounded-t-sm h-3"></div>
            <div className="w-2 bg-blue-500 rounded-t-sm h-5"></div>
            <div className="w-2 bg-blue-500 rounded-t-sm h-4"></div>
            <div className="w-2 bg-blue-400 rounded-t-sm h-6"></div>
            <div className="w-2 bg-white rounded-t-sm h-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            <div className="w-2 bg-slate-700 rounded-t-sm h-2"></div>
            <div className="w-2 bg-slate-700 rounded-t-sm h-4"></div>
        </div>
      </div>

      {/* Body: Desglose y Lista */}
      <div className="flex-1 px-4 -mt-4 relative z-20 flex flex-col gap-4 overflow-hidden">
        
        {/* Tarjetas de Resumen (Desglose) */}
        <div className="flex gap-3">
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-1">
                <div className="bg-green-100 p-2 rounded-full mb-1">
                    <Wallet size={14} className="text-green-600"/>
                </div>
                <p className="text-slate-400 text-[9px] font-bold uppercase">Efectivo</p>
                <p className="text-slate-800 font-bold text-sm">S/ {currentData.cash}</p>
            </div>
            <div className="flex-1 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-1">
                <div className="bg-purple-100 p-2 rounded-full mb-1">
                    <CreditCard size={14} className="text-purple-600"/>
                </div>
                <p className="text-slate-400 text-[9px] font-bold uppercase">Digital</p>
                <p className="text-slate-800 font-bold text-sm">S/ {currentData.digital}</p>
            </div>
        </div>

        {/* Lista de Movimientos */}
        <div className="flex-1 bg-white rounded-t-3xl shadow-lg border border-slate-100 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800 text-xs">Movimientos Recientes</h3>
                <PieChart size={14} className="text-slate-400"/>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {currentData.transactions.map((tx) => (
                        <motion.div 
                            key={tx.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between group cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${tx.type === 'income' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                                    {tx.type === 'income' ? <ArrowDownLeft size={16}/> : <ArrowUpRight size={16}/>}
                                </div>
                                <div>
                                    <p className="text-slate-800 font-bold text-xs">{tx.title}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[9px] text-slate-400">{tx.time}</span>
                                        <span className="text-[9px] text-slate-300">•</span>
                                        <span className="text-[9px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">{tx.method}</span>
                                    </div>
                                </div>
                            </div>
                            <p className={`font-bold text-sm ${tx.type === 'income' ? 'text-blue-600' : 'text-red-500'}`}>
                                {tx.amount}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {/* Botón Fake al final */}
                <div className="pt-2">
                    <button className="w-full py-2 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg border border-dashed border-slate-200 hover:bg-slate-100 hover:text-slate-500 transition-colors">
                        Ver historial completo
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};