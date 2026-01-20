"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, Bell, ArrowUpRight, CreditCard, ShoppingBag, Wallet, Check, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const MockupDashboard = () => {
  // Estado de las métricas
  const [sales, setSales] = useState(1250.00);
  const [activeNotif, setActiveNotif] = useState<any>(null);

  // Simulación de Notificaciones cayendo
  useEffect(() => {
    const cycle = [
      { id: 1, title: "Pago Recibido", msg: "Yape de Juan P. (+S/ 25.00)", amount: 25 },
      { id: 2, title: "Alerta de Stock", msg: "Detergente bajo (20%)", type: "alert" },
      { id: 3, title: "Nuevo Pedido", msg: "Ticket #0495 creado", type: "info" },
      { id: 4, title: "Cierre de Caja", msg: "Turno mañana cuadrado ✅", type: "success" }
    ];

    let index = 0;

    const interval = setInterval(() => {
      const notif = cycle[index];
      
      // 1. Mostrar Notificación
      setActiveNotif(notif);

      // 2. Si es pago, actualizar dinero visualmente
      if (notif.amount) {
        setTimeout(() => {
            setSales(prev => prev + notif.amount);
        }, 500); // Pequeño delay para realismo
      }

      // 3. Ocultar notificación después de 3s
      setTimeout(() => setActiveNotif(null), 3000);

      // Avanzar ciclo
      index = (index + 1) % cycle.length;
    }, 5000); // Cada 5 segundos pasa algo

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-[380px] mx-auto h-[600px] perspective-1000">
      
      {/* Sombra/Glow trasero para despegarlo del fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/20 blur-[80px] rounded-full opacity-20 -z-10"></div>

      {/* --- EL TELÉFONO (BLANCO LIMPIO) --- */}
      <div className="absolute inset-0 bg-slate-50 rounded-[3rem] overflow-hidden border-[10px] border-white shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] flex flex-col relative z-10">
         
         {/* NOTCH / BARRA DE ESTADO */}
         <div className="h-7 w-full bg-white relative z-30 flex justify-between items-center px-6 pt-2">
            <span className="text-[10px] font-bold text-slate-900">9:41</span>
            <div className="flex gap-1.5">
                <div className="w-4 h-1.5 bg-slate-800 rounded-sm"></div>
                <div className="w-0.5 h-1.5 bg-slate-300 rounded-sm"></div>
            </div>
         </div>

         {/* --- ZONA DE NOTIFICACIONES (CAEN DESDE ARRIBA) --- */}
         <div className="absolute top-2 left-0 w-full px-3 z-50 pointer-events-none">
             <AnimatePresence>
                {activeNotif && (
                    <motion.div
                        initial={{ y: -100, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -100, opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-slate-200/50 flex items-center gap-3"
                    >
                        {/* Icono dinámico según tipo */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            activeNotif.type === 'alert' ? 'bg-orange-100 text-orange-600' :
                            activeNotif.type === 'success' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                        }`}>
                            {activeNotif.type === 'alert' ? <Bell size={18} /> : 
                             activeNotif.type === 'success' ? <Check size={18} /> :
                             <Wallet size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900">{activeNotif.title}</p>
                            <p className="text-xs text-slate-500 truncate">{activeNotif.msg}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">Ahora</span>
                    </motion.div>
                )}
             </AnimatePresence>
         </div>

         {/* --- HEADER APP --- */}
         <div className="px-6 pt-8 pb-4 bg-white z-20">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Buenos días,</p>
                    <h3 className="text-xl font-black text-slate-900">Jose Romero</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Richar&background=0f172a&color=fff" alt="User"/>
                </div>
            </div>
         </div>

         {/* --- CONTENIDO SCROLLABLE --- */}
         <div className="flex-1 overflow-hidden relative px-6 pb-6 space-y-6 bg-slate-50">
            
            {/* 1. TARJETA DE BALANCE (Big Card) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/30 relative overflow-hidden group">
                {/* Decoración fondo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <p className="text-blue-100 text-xs font-medium mb-2 flex items-center gap-2">
                    <Wallet size={14} /> Balance Total
                </p>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tight">
                        S/ <motion.span>{sales.toFixed(2)}</motion.span>
                    </span>
                </div>
                
                <div className="mt-6 flex gap-3">
                    <button className="flex-1 bg-white/20 backdrop-blur-sm py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-white/30 transition-colors">
                        <ArrowUpRight size={14}/> Retirar
                    </button>
                    <button className="flex-1 bg-white text-blue-600 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1">
                        <DollarSign size={14}/> Ingreso
                    </button>
                </div>
            </div>

            {/* 2. GRID ACCESOS RÁPIDOS */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                        <ShoppingBag size={20}/>
                    </div>
                    <span className="text-xs font-bold text-slate-700">Pedidos</span>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">12 Activos</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                        <Users size={20}/>
                    </div>
                    <span className="text-xs font-bold text-slate-700">Clientes</span>
                    <span className="text-[10px] text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">+5 Hoy</span>
                </div>
            </div>

            {/* 3. LISTA MOVIMIENTOS RECIENTES */}
            <div>
                <div className="flex justify-between items-end mb-3">
                    <h4 className="text-sm font-bold text-slate-900">Movimientos</h4>
                    <span className="text-[10px] text-blue-600 font-bold cursor-pointer">Ver todo</span>
                </div>
                
                <div className="space-y-3">
                    {/* Item 1 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                <DollarSign size={14} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">Venta Yape</p>
                                <p className="text-[10px] text-slate-400">Hace 2 min</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-green-600">+S/ 25.00</span>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between opacity-70">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <CreditCard size={14} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-900">Pago Tarjeta</p>
                                <p className="text-[10px] text-slate-400">Hace 1 hora</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-green-600">+S/ 45.00</span>
                    </div>
                </div>
            </div>

         </div>

         {/* --- BOTTOM NAV BAR --- */}
         <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-2 z-20">
             <div className="p-2 text-blue-600 flex flex-col items-center">
                 <TrendingUp size={20}/>
                 <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
             </div>
             <div className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                 <ShoppingBag size={20}/>
             </div>
             <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-lg shadow-slate-900/20 -mt-6">
                 <Menu size={20}/>
             </div>
             <div className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                 <Users size={20}/>
             </div>
             <div className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                 <Bell size={20}/>
             </div>
         </div>

      </div>
    </div>
  );
};