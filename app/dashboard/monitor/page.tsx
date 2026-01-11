"use client";

import { useState } from "react";
import { Truck, ListFilter, Search, Bike, CheckCircle2, AlertTriangle, CreditCard, Banknote, CalendarDays } from "lucide-react";
import { Order } from "@/app/monitor"; 
import { StatusBadge } from "@/components/StatusBadge";
import { OrderDetailModal } from "@/components/OrderDetailModal";

// --- MOCK DATA (Con años agregados para que funcione el filtro) ---
const INITIAL_DATA: Order[] = [
  { 
    id: "1001", 
    cliente: { nombre: "Juan Pérez", celular: "999888777", dni_ruc: "10778899" },
    estado: "TERMINADO", 
    prioridad: "NORMAL",
    logistica: {
      tipo_entrega: "DELIVERY",
      distrito: null, direccion: null, referencia: null, google_maps_link: null,
      motorizado_nombre: null 
    },
    // Nota: Usar formato ISO o estándar ayuda, aquí simulamos tu formato
    fechas: { ingreso: "11/01/2026 10:00 AM", salida_prog: "13/01/2026 05:00 PM" },
    detalle_prendas: [
      { id: "p1", cant: 3, item: "Camisas", servicio: "Lavado", precio_unitario: 5.00, subtotal: 15.00 }
    ],
    observaciones: "Revisar botones",
    finanzas: { 
      subtotal_servicios: 27.00, costo_delivery: 0, descuento: 0, total_final: 27.00,
      acuenta: 10.00, saldo_pendiente: 17.00, es_pagado: false, metodo_pago_inicial: "YAPE"
    } 
  },
  // ... (Tus otros datos mock)
  { 
    id: "0990", 
    cliente: { nombre: "Cliente Antiguo", celular: "999000000" },
    estado: "ENTREGADO", 
    prioridad: "NORMAL",
    logistica: { tipo_entrega: "TIENDA", distrito: null, direccion: null, referencia: null, google_maps_link: null },
    fechas: { ingreso: "01/12/2025 10:00 AM", salida_prog: "03/12/2025 10:00 AM" }, // FECHA ANTIGUA
    detalle_prendas: [],
    observaciones: null,
    finanzas: { subtotal_servicios: 10, costo_delivery: 0, descuento: 0, total_final: 10, acuenta: 10, saldo_pendiente: 0, es_pagado: true } 
  },
];

export default function MonitorPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'listos' | 'ruta' | 'historial'>('listos');
  const [searchTerm, setSearchTerm] = useState("");
  
  // NUEVO ESTADO: Filtro de Tiempo
  const [timeFilter, setTimeFilter] = useState<'7d' | '30d' | 'all'>('7d');
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleUpdateOrder = (updatedOrder: Order) => {
    const newOrders = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    setOrders(newOrders);
    setSelectedOrder(updatedOrder); 
  };

  // Helper para convertir tu fecha string (dd/mm/yyyy) a objeto Date real
  const parseDate = (dateString: string) => {
    // Asumiendo formato "dd/mm/yyyy hh:mm AM"
    // Extraemos solo la fecha dd/mm/yyyy para comparar
    const [datePart] = dateString.split(' '); 
    const [day, month, year] = datePart.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const matchesText = order.id.includes(term) || order.cliente.nombre.toLowerCase().includes(term);
    
    // 1. FILTRO DE PESTAÑAS (ESTADO)
    let matchesTab = false;
    if (activeTab === 'listos') matchesTab = (order.estado === 'TERMINADO');
    else if (activeTab === 'ruta') matchesTab = (order.estado === 'EN_RUTA');
    else matchesTab = true; // Historial muestra todo

    // 2. FILTRO DE FECHA (Solo aplica si estamos en HISTORIAL)
    let matchesDate = true;
    if (activeTab === 'historial' && timeFilter !== 'all') {
        const orderDate = parseDate(order.fechas.ingreso);
        const today = new Date(); // Fecha actual (Simulada o real)
        // Simulamos que hoy es 15/01/2026 para que el mock funcione
        // const today = new Date(2026, 0, 15); 
        
        const diffTime = Math.abs(today.getTime() - orderDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if (timeFilter === '7d') matchesDate = diffDays <= 7;
        if (timeFilter === '30d') matchesDate = diffDays <= 30;
    }

    return matchesText && matchesTab && matchesDate;
  });

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Torre de Control</h1>

      {/* --- PESTAÑAS PRINCIPALES --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button 
          onClick={() => setActiveTab('listos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border
            ${activeTab === 'listos' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-500 border-gray-200'}`}
        >
          <CheckCircle2 size={16} /> 🟢 Por Asignar
          <span className="bg-white/20 px-1.5 rounded text-xs ml-1">{orders.filter(o => o.estado === 'TERMINADO').length}</span>
        </button>

        <button 
          onClick={() => setActiveTab('ruta')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border
            ${activeTab === 'ruta' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-200'}`}
        >
          <Bike size={16} /> 🛵 En Ruta
          <span className="bg-white/20 px-1.5 rounded text-xs ml-1">{orders.filter(o => o.estado === 'EN_RUTA').length}</span>
        </button>

        <button 
          onClick={() => setActiveTab('historial')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border
            ${activeTab === 'historial' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}
        >
          <ListFilter size={16} /> 📂 Historial
        </button>
      </div>

      {/* --- BARRA DE HERRAMIENTAS (BUSCADOR + FECHA) --- */}
      <div className="bg-white p-2 rounded-xl shadow-sm mb-4 border border-gray-100 flex flex-col md:flex-row gap-2">
         
         {/* Buscador */}
         <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={activeTab === 'historial' ? "Buscar en historial..." : "Buscar ticket..."}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            />
         </div>

         {/* FILTRO DE FECHA (Solo visible en Historial) */}
         {activeTab === 'historial' && (
             <div className="flex items-center bg-gray-50 border rounded-lg px-2">
                <CalendarDays size={18} className="text-gray-500 mr-2"/>
                <select 
                    className="bg-transparent text-sm font-medium text-gray-700 outline-none py-2"
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value as any)}
                >
                    <option value="7d">Últimos 7 días</option>
                    <option value="30d">Últimos 30 días</option>
                    <option value="all">Ver Todo (Cuidado)</option>
                </select>
             </div>
         )}
      </div>

      {/* --- MENSAJE INFORMATIVO DE FILTRO --- */}
      {activeTab === 'historial' && timeFilter !== 'all' && (
          <p className="text-xs text-gray-400 mb-2 ml-1">
              * Mostrando solo pedidos de los últimos {timeFilter === '7d' ? '7' : '30'} días.
          </p>
      )}

      {/* LISTA */}
      <div className="space-y-3">
        {filteredOrders.length === 0 && (
            <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                No hay pedidos que coincidan.
            </div>
        )}
        
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border flex overflow-hidden hover:shadow-md transition-shadow cursor-pointer group relative"
               onClick={() => setSelectedOrder(order)}>
             
             <div className={`w-1 absolute top-0 bottom-0 left-0 ${order.prioridad === 'EXPRESS' ? 'bg-purple-500' : 'bg-transparent'}`}></div>

             <div className={`w-20 ml-1 flex flex-col items-center justify-center border-r p-2 text-center transition-colors
                 ${order.estado === 'TERMINADO' ? 'bg-green-50 group-hover:bg-green-100' : 
                   order.estado === 'EN_RUTA' ? 'bg-purple-50 group-hover:bg-purple-100' : 'bg-gray-50'}`}>
                 <span className="text-[10px] text-gray-500 font-bold uppercase">Ticket</span>
                 <span className="text-xl font-black text-gray-700">#{order.id}</span>
             </div>

             <div className="flex-1 p-3 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                   <div className="flex items-center gap-2">
                       <h3 className="font-bold text-gray-800">{order.cliente.nombre}</h3>
                       {order.prioridad === 'EXPRESS' && (
                           <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold border border-purple-200">
                               <AlertTriangle size={10}/> EXPRESS
                           </span>
                       )}
                   </div>
                   <StatusBadge estado={order.estado} />
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                   <span className="flex items-center gap-1">
                      <Truck size={12}/> {order.logistica.distrito || "Recojo en Tienda"}
                   </span>
                   {order.logistica.motorizado_nombre && (
                       <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                           <Bike size={12}/> {order.logistica.motorizado_nombre}
                       </span>
                   )}
                   <span className={`flex items-center gap-1 font-bold ${order.finanzas.es_pagado ? 'text-green-600' : 'text-red-500'}`}>
                      {order.finanzas.es_pagado ? <><CreditCard size={12}/> PAGADO</> : <><Banknote size={12}/> DEBE S/ {order.finanzas.saldo_pendiente.toFixed(2)}</>}
                   </span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdateOrder={handleUpdateOrder}
        />
      )}
    </div>
  );
}