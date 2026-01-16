"use client";
import { DollarSign, TrendingUp } from "lucide-react";

export const ScreenFinance = () => (
  <div className="w-full h-full bg-slate-50 flex flex-col font-sans select-none">
    <div className="bg-slate-900 p-5 pt-8 shadow-lg relative z-10">
      <p className="text-slate-400 text-[10px] uppercase font-bold">
        Caja de Hoy
      </p>
      <p className="text-white font-black text-2xl">S/ 850.50</p>
    </div>
    <div className="flex-1 p-4 space-y-3 bg-white relative z-0">
      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <div className="bg-blue-100 p-2 rounded-full">
          <DollarSign size={16} className="text-blue-600" />
        </div>
        <div>
          <p className="text-slate-900 font-bold text-xs">Ingreso Efectivo</p>
          <p className="text-slate-500 text-[10px]">Hace 5 min</p>
        </div>
        <span className="ml-auto font-bold text-slate-900 text-sm">
          +45.00
        </span>
      </div>
      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
        <div className="bg-red-100 p-2 rounded-full">
          <TrendingUp size={16} className="text-red-600 rotate-180" />
        </div>
        <div>
          <p className="text-slate-900 font-bold text-xs">Pago Insumos</p>
          <p className="text-slate-500 text-[10px]">Hace 1 hora</p>
        </div>
        <span className="ml-auto font-bold text-red-600 text-sm">
          -120.00
        </span>
      </div>
    </div>
  </div>
);