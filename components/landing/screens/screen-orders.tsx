"use client";

import { useState } from "react";
import { Bell, MessageCircle, Check, Bike, MapPin, WashingMachine, Shirt, Clock, Truck, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = 'process' | 'ready' | 'delivery';

export const ScreenOrders = ({ isActive }: { isActive: boolean }) => {
  const [activeTab, setActiveTab] = useState<Tab>('process');
  
  // Estado para simular notificaciones enviadas
  const [notified, setNotified] = useState<number[]>([]);

  const handleNotify = (id: number) => {
    if (!isActive) return;
    setNotified(prev => [...prev, id]);
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col font-sans select-none">
      
      {/* Header */}
      <div className="bg-[#010E9B] p-5 pt-8 shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
            <p className="text-white font-bold text-sm">Mis Pedidos</p>
            <div className="relative">
                <Bell className="text-white w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#010E9B]"></span>
            </div>
        </div>
        
        {/* Tabs de Filtro */}
        <div className="flex bg-blue-900/50 p-1 rounded-lg backdrop-blur-sm">
            <button 
                onClick={(e) => { e.stopPropagation(); setActiveTab('process'); }}
                className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${activeTab === 'process' ? 'bg-white text-[#010E9B] shadow-sm' : 'text-blue-200 hover:text-white'}`}
            >
                Proceso
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); setActiveTab('ready'); }}
                className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${activeTab === 'ready' ? 'bg-white text-[#010E9B] shadow-sm' : 'text-blue-200 hover:text-white'}`}
            >
                Listos
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); setActiveTab('delivery'); }}
                className={`flex-1 text-[10px] font-bold py-1.5 rounded-md transition-all ${activeTab === 'delivery' ? 'bg-white text-[#010E9B] shadow-sm' : 'text-blue-200 hover:text-white'}`}
            >
                Delivery
            </button>
        </div>
      </div>

      {/* Body: Contenido Cambiante con Scroll */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-slate-100 relative z-0 no-scrollbar">
        <AnimatePresence mode="wait">
            
            {/* VISTA 1: EN PROCESO */}
            {activeTab === 'process' && (
                <motion.div 
                    key="process"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="space-y-3"
                >
                    {/* Item 1: Lavando */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between mb-3">
                            <span className="font-bold text-slate-700 text-xs">Hotel "El Sol"</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">Lavando</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300 relative px-2">
                             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
                             <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-blue-500 -z-0"></div>
                             <div className="z-10 flex flex-col items-center gap-1">
                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-200"><WashingMachine size={12}/></div>
                                <span className="text-[8px] font-bold text-blue-600">Lavado</span>
                             </div>
                             <div className="z-10 flex flex-col items-center gap-1">
                                <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center"><Clock size={12}/></div>
                             </div>
                             <div className="z-10 flex flex-col items-center gap-1">
                                <div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center"><Shirt size={12}/></div>
                             </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-3 text-center">Termina en aprox. 45 min</p>
                    </div>

                    {/* Item 2: Secando */}
                    <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm">
                        <div className="flex justify-between mb-3">
                            <span className="font-bold text-slate-700 text-xs">Restaurante "Gusto"</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100">Secando</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-300 relative px-2">
                             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>
                             <div className="absolute top-1/2 left-0 w-2/3 h-0.5 bg-orange-500 -z-0"></div>
                             <div className="z-10 flex flex-col items-center gap-1"><div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center"><Check size={10}/></div></div>
                             <div className="z-10 flex flex-col items-center gap-1">
                                <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-200"><Clock size={12}/></div>
                                <span className="text-[8px] font-bold text-orange-600">Secado</span>
                             </div>
                             <div className="z-10 flex flex-col items-center gap-1"><div className="w-6 h-6 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center"><Shirt size={12}/></div></div>
                        </div>
                    </div>

                    {/* Cola de Espera */}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2 mt-4">En Cola de Espera</p>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm opacity-70 flex justify-between items-center">
                         <span className="font-bold text-slate-700 text-xs">Fam. Rodriguez</span>
                         <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">20kg • Ropa</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm opacity-70 flex justify-between items-center">
                         <span className="font-bold text-slate-700 text-xs">Sr. Marco T.</span>
                         <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">3 Ternos</span>
                    </div>
                </motion.div>
            )}

            {/* VISTA 2: LISTOS (Más datos) */}
            {activeTab === 'ready' && (
                 <motion.div 
                    key="ready"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="space-y-3"
                 >
                    {[
                        { id: 1, name: "Juan Perez", items: "2 Ternos, 3 Camisas" },
                        { id: 2, name: "Ana Lopez", items: "1 Edredón King" },
                        { id: 3, name: "Clínica Dental", items: "15 Uniformes" },
                        { id: 4, name: "Jorge M.", items: "3 Pares Zapatillas" }
                    ].map((order) => (
                        <div key={order.id} className="bg-white p-3 rounded-xl border border-green-100 shadow-sm">
                            <div className="flex justify-between mb-1">
                                <span className="font-bold text-slate-700 text-xs">{order.name}</span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">LISTO</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mb-2">{order.items}</p>
                            
                            {!notified.includes(order.id) ? (
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleNotify(order.id); }} 
                                    className="w-full bg-[#010E9B] text-white text-[10px] font-bold py-2 rounded flex items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-blue-900"
                                >
                                    <MessageCircle size={12} /> Avisar por WhatsApp
                                </button>
                            ) : (
                                <div className="w-full py-1.5 bg-green-50 rounded border border-green-100 flex items-center justify-center gap-1 text-green-600 text-[10px] font-bold">
                                    <Check size={12} /> Mensaje Enviado
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="h-4"/> {/* Espacio extra al final */}
                 </motion.div>
            )}

            {/* VISTA 3: DELIVERY (Más completo) */}
            {activeTab === 'delivery' && (
                <motion.div 
                    key="delivery"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    className="space-y-3"
                >
                    {/* Delivery Activo 1 */}
                    <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <span className="font-bold text-slate-700 text-xs flex items-center gap-1">
                                    <Bike size={12} className="text-orange-500"/> Carlos (Moto 1)
                                </span>
                                <p className="text-[9px] text-slate-400 mt-0.5">En ruta a: Miraflores</p>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center animate-pulse">
                                <MapPin size={12} className="text-orange-600"/>
                            </div>
                        </div>
                        <div className="mt-3 h-16 bg-slate-100 rounded-lg relative overflow-hidden border border-slate-200">
                             <div className="absolute top-2 left-0 w-full h-1 bg-slate-200 rotate-12"></div>
                             <div className="absolute top-8 left-0 w-full h-1 bg-slate-200 -rotate-3"></div>
                             <div className="absolute top-0 left-10 h-full w-1 bg-slate-200"></div>
                             <motion.div 
                                animate={{ x: [0, 80], y: [0, 5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute top-6 left-2 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow-md z-10"
                             />
                        </div>
                    </div>

                    {/* Delivery Activo 2 */}
                    <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-bold text-slate-700 text-xs flex items-center gap-1">
                                    <Truck size={12} className="text-blue-500"/> Luis (Van)
                                </span>
                                <p className="text-[9px] text-slate-400 mt-0.5">En ruta a: San Isidro</p>
                            </div>
                            <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">4 Pedidos</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                            <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Lista de Pendientes */}
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-2 mt-2">Próximas Salidas</p>
                    <div className="bg-white p-2 rounded-xl border border-slate-200 opacity-80 flex gap-3 items-center">
                        <div className="bg-slate-100 p-2 rounded-lg"><Package size={14} className="text-slate-500"/></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">Ruta Norte</p>
                            <p className="text-[9px] text-slate-400">Salida: 4:30 PM • 3 Pedidos</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};