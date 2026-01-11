"use client";

import { useState } from "react";
import Link from "next/link"; // Importamos Link para la navegación
import { 
  Banknote, AlertCircle, CheckCircle2, 
  Package, Clock, Calendar, ArrowUpRight, CreditCard, Settings // Importamos Settings
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- MOCK DATA PARA GRÁFICOS ---
const DATA_VENTAS_SEMANAL = [
  { name: 'Lun', ventas: 120 },
  { name: 'Mar', ventas: 200 },
  { name: 'Mié', ventas: 150 },
  { name: 'Jue', ventas: 320 },
  { name: 'Vie', ventas: 450 },
  { name: 'Sáb', ventas: 600 },
  { name: 'Dom', ventas: 180 },
];

const DATA_ESTADOS = [
  { name: 'Por Lavar (Pendiente)', value: 12, color: '#94a3b8' }, 
  { name: 'En Lavadora (Proceso)', value: 8, color: '#3b82f6' },  
  { name: 'Listos (Terminado)', value: 15, color: '#22c55e' },    
];

export default function AdminDashboard() {
  const [mes, setMes] = useState("Enero 2026");

  return (
    <div className="p-6 bg-gray-50 min-h-screen pb-24">
      
      {/* HEADER CON BOTÓN DE SETTINGS */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel Gerencial 📊</h1>
          <p className="text-sm text-gray-500">Resumen operativo y financiero.</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Visualizador de Fecha */}
            <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm text-sm">
               <Calendar size={18} className="text-gray-500"/>
               <span className="font-bold text-gray-700">{mes}</span>
            </div>

            {/* --- AQUÍ ESTÁ EL BOTÓN DE CONFIGURACIÓN --- */}
            <Link href="/dashboard/settings">
                <button className="flex items-center gap-2 p-2.5 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800 transition-all active:scale-95">
                   <Settings size={20} />
                   <span className="hidden md:block text-sm font-bold">Configuración</span>
                </button>
            </Link>
        </div>
      </div>

      {/* 1. KPI CARDS (FINANCIERO) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Ingresos Totales */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Ingresos (Mes)</p>
                <h3 className="text-2xl font-black text-gray-800 mt-1">S/ 4,250.00</h3>
                <span className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUpRight size={12}/> +15% vs mes anterior
                </span>
              </div>
              <div className="p-2 bg-green-50 rounded-lg text-green-600"><Banknote size={24}/></div>
           </div>
        </div>

        {/* Por Cobrar (Delivery) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-l-4 border-l-red-500">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Por Cobrar (Calle)</p>
                <h3 className="text-2xl font-black text-red-600 mt-1">S/ 380.00</h3>
                <p className="text-xs text-gray-400 mt-1">Dinero en manos de motorizados</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg text-red-600"><AlertCircle size={24}/></div>
           </div>
        </div>

        {/* Total Pedidos */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Pedidos Totales</p>
                <h3 className="text-2xl font-black text-gray-800 mt-1">145</h3>
                <p className="text-xs text-gray-400 mt-1">Ticket Prom: S/ 29.30</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Package size={24}/></div>
           </div>
        </div>

        {/* Efectivo vs Yape */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-500 font-bold uppercase">Método de Pago</p>
              <div className="flex justify-between items-center text-sm">
                 <span className="flex items-center gap-1"><Banknote size={14} className="text-green-600"/> Efectivo</span>
                 <span className="font-bold">60%</span>
              </div>
              <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                 <div className="bg-green-500 h-full w-[60%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm mt-1">
                 <span className="flex items-center gap-1"><CreditCard size={14} className="text-purple-600"/> Yape/Plin</span>
                 <span className="font-bold">40%</span>
              </div>
           </div>
        </div>
      </div>

      {/* 2. DASHBOARD OPERATIVO (ESTADOS DE PRENDAS) */}
      <h2 className="text-lg font-bold text-gray-800 mb-4">Estado de Planta (En tiempo real)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Gráfico de Pie (Distribución) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-gray-500 mb-4 self-start">Distribución de Carga</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DATA_ESTADOS}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DATA_ESTADOS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* Tarjetas de Detalle Operativo */}
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* SIN LAVAR */}
            <div className="bg-gray-100 p-4 rounded-xl flex flex-col justify-between border border-gray-200">
               <div className="flex justify-between">
                  <span className="bg-gray-200 p-2 rounded-lg text-gray-600"><Package size={20}/></span>
                  <span className="text-2xl font-black text-gray-700">12</span>
               </div>
               <div>
                  <h4 className="font-bold text-gray-700">Por Lavar</h4>
                  <p className="text-xs text-gray-500">Pendientes de ingreso.</p>
               </div>
            </div>

            {/* EN CURSO */}
            <div className="bg-blue-50 p-4 rounded-xl flex flex-col justify-between border border-blue-100">
               <div className="flex justify-between">
                  <span className="bg-blue-200 p-2 rounded-lg text-blue-600"><Clock size={20}/></span>
                  <span className="text-2xl font-black text-blue-700 animate-pulse">8</span>
               </div>
               <div>
                  <h4 className="font-bold text-blue-800">En Proceso</h4>
                  <p className="text-xs text-blue-600">Lavando o Secando.</p>
               </div>
            </div>

            {/* COMPLETADOS */}
            <div className="bg-green-50 p-4 rounded-xl flex flex-col justify-between border border-green-100">
               <div className="flex justify-between">
                  <span className="bg-green-200 p-2 rounded-lg text-green-600"><CheckCircle2 size={20}/></span>
                  <span className="text-2xl font-black text-green-700">15</span>
               </div>
               <div>
                  <h4 className="font-bold text-green-800">Listos</h4>
                  <p className="text-xs text-green-600">Para entrega.</p>
               </div>
            </div>

            {/* Gráfico de Barras (Ventas Semanales) */}
            <div className="bg-white col-span-3 p-4 rounded-xl shadow-sm border border-gray-100 mt-2">
               <h3 className="text-sm font-bold text-gray-500 mb-4">Ventas de la Semana</h3>
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={DATA_VENTAS_SEMANAL}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis 
                          tick={{fontSize: 12}} 
                          axisLine={false} 
                          tickLine={false} 
                          tickFormatter={(value) => `S/ ${value}`} 
                      />
                      <Tooltip 
  // CORRECCIÓN AQUÍ: Usamos 'any' para evitar el conflicto de tipos
  formatter={(value: any) => [`S/ ${value}`, 'Ventas']}
  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
  cursor={{fill: '#f3f4f6'}}
/>
                      <Bar dataKey="ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

        </div>
      </div>

    </div>
  );
}