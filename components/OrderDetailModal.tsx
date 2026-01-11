import { useState, useMemo } from "react";
import { 
  X, Truck, Edit3, Link as LinkIcon, MapPin, 
  ExternalLink, MessageCircle, Bike, Receipt 
} from "lucide-react";
// Importar la interfaz desde tu archivo de tipos
import { Order } from "@/app/monitor"; 
import { StatusBadge } from "./StatusBadge";

const MOTORIZADOS = ["Jorge (Moto 1)", "Luis (Moto 2)", "Pedro (Part Time)"];

interface ModalProps {
  order: Order;
  onClose: () => void;
  onUpdateOrder: (updatedOrder: Order) => void;
}

export const OrderDetailModal = ({ order, onClose, onUpdateOrder }: ModalProps) => {
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  
  // 1. CORRECCIÓN: Inicializar estado leyendo desde 'order.logistica'
  const [tempData, setTempData] = useState({
    distrito: order.logistica.distrito || "San Martín de Porres",
    direccion: order.logistica.direccion || "",
    referencia: order.logistica.referencia || "",
    google_maps_link: order.logistica.google_maps_link || ""
  });

  // 2. CORRECCIÓN: Leer subtotal desde 'order.finanzas.subtotal_servicios'
  const previewDeliveryPrice = useMemo(() => {
    let costo = tempData.distrito === "San Martín de Porres" ? 5.00 : 10.00;
    if (order.finanzas.subtotal_servicios > 60.00) costo = 0;
    return costo;
  }, [tempData.distrito, order.finanzas.subtotal_servicios]);

  // 3. CORRECCIÓN: Guardar manteniendo la estructura anidada
  const handleSaveAddress = () => {
    onUpdateOrder({
      ...order,
      logistica: {
        ...order.logistica, // Mantenemos otros datos logísticos (como el motorizado)
        distrito: tempData.distrito,
        direccion: tempData.direccion,
        referencia: tempData.referencia,
        google_maps_link: tempData.google_maps_link,
      },
      finanzas: { 
        ...order.finanzas, 
        costo_delivery: previewDeliveryPrice,
        // Recalcular total final: (subtotal + nuevo delivery) - descuento
        total_final: (order.finanzas.subtotal_servicios + previewDeliveryPrice) - order.finanzas.descuento
      }
    });
    setIsEditingAddress(false);
  };

  // 4. CORRECCIÓN: Asignar motorizado dentro de 'order.logistica'
  const handleAssignMotorizado = (nombre: string) => {
    if (!nombre) return;
    
    onUpdateOrder({
      ...order,
      estado: 'EN_RUTA', // Cambia estado global
      logistica: {
        ...order.logistica,
        motorizado_nombre: nombre
      }
    });
  };

  const getTotales = () => {
      // Usamos los campos correctos de la nueva interfaz
      const total = order.finanzas.total_final; // Ya viene calculado o lo calculamos al vuelo
      const deuda = order.finanzas.es_pagado ? 0 : order.finanzas.saldo_pendiente;
      return { total, deuda };
  };

  const handleContactar = () => {
    const { deuda } = getTotales();
    let msg = "";
    
    // CORRECCIÓN: Acceder a order.cliente.nombre y order.logistica.motorizado_nombre
    if (order.estado === 'EN_RUTA') {
        msg = `Hola ${order.cliente.nombre}, tu pedido va en camino con ${order.logistica.motorizado_nombre} 🛵. Saldo a pagar: S/ ${deuda.toFixed(2)}.`;
    } else {
        msg = `Hola ${order.cliente.nombre}, tu pedido está listo. ¿Confirmamos dirección de entrega?`;
    }
    
    // CORRECCIÓN: Acceder a order.cliente.celular
    window.open(`https://wa.me/51${order.cliente.celular}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* HEADER */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-white/10 px-3 py-1 rounded text-center">
                <span className="block text-[10px] text-gray-400">TICKET</span>
                <span className="block font-bold text-lg">#{order.id}</span>
             </div>
             <div>
                {/* CORRECCIÓN: order.cliente.nombre */}
                <h3 className="font-bold">{order.cliente.nombre}</h3>
                <StatusBadge estado={order.estado} />
             </div>
          </div>
          <button onClick={onClose} className="hover:text-red-400"><X size={24} /></button>
        </div>

        <div className="p-0 overflow-y-auto bg-gray-50">

          {/* --- ZONA DE ASIGNACIÓN --- */}
          {(order.estado === 'TERMINADO' || order.estado === 'EN_RUTA') && (
            <div className={`p-4 border-b ${order.estado === 'EN_RUTA' ? 'bg-purple-50 border-purple-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-2 mb-2">
                    <Bike size={20} className={order.estado === 'EN_RUTA' ? "text-purple-700" : "text-green-700"}/>
                    <h4 className="font-bold text-sm text-gray-800">Asignar Motorizado</h4>
                </div>
                
                <div className="flex gap-2">
                    <select 
                        className="flex-1 p-2 border rounded-lg text-sm bg-white"
                        // CORRECCIÓN: order.logistica.motorizado_nombre
                        value={order.logistica.motorizado_nombre || ""}
                        onChange={(e) => handleAssignMotorizado(e.target.value)}
                    >
                        <option value="" disabled>-- Seleccionar Chofer --</option>
                        {MOTORIZADOS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                </div>
            </div>
          )}

          <div className="p-4 space-y-4">
            {/* --- BLOQUE DE DIRECCIÓN --- */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-gray-700 text-sm flex items-center gap-2"><Truck size={16}/> Datos de Entrega</h4>
                    {!isEditingAddress && (
                        <button onClick={() => setIsEditingAddress(true)} className="text-xs text-blue-600 font-semibold flex items-center gap-1"><Edit3 size={12}/> Editar</button>
                    )}
                </div>
                
                {isEditingAddress ? (
                    <div className="space-y-2 text-sm animate-in fade-in">
                        <select className="w-full p-2 border rounded" value={tempData.distrito} onChange={(e) => setTempData({...tempData, distrito: e.target.value})}>
                            <option value="San Martín de Porres">San Martín de Porres</option>
                            <option value="Los Olivos">Los Olivos</option>
                            <option value="Independencia">Independencia</option>
                        </select>
                        <input className="w-full p-2 border rounded" placeholder="Dirección..." value={tempData.direccion} onChange={(e) => setTempData({...tempData, direccion: e.target.value})} />
                        <input className="w-full p-2 border rounded" placeholder="Referencia..." value={tempData.referencia} onChange={(e) => setTempData({...tempData, referencia: e.target.value})} />
                        <div className="relative">
                            <LinkIcon className="absolute left-2 top-2.5 text-gray-400" size={14} />
                            <input className="w-full pl-8 p-2 border rounded text-blue-600" placeholder="Pegar Link de Maps..." value={tempData.google_maps_link} onChange={(e) => setTempData({...tempData, google_maps_link: e.target.value})} />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-xs text-blue-600 font-bold">Costo: S/ {previewDeliveryPrice.toFixed(2)}</span>
                            <button onClick={handleSaveAddress} className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold">Guardar Cambios</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm">
                        {/* CORRECCIÓN: Usar order.logistica.* */}
                        {order.logistica.distrito ? (
                            <>
                                <p className="font-bold text-gray-800">{order.logistica.distrito}</p>
                                <p className="text-gray-600">{order.logistica.direccion}</p>
                                <p className="text-xs text-gray-400 italic">Ref: {order.logistica.referencia}</p>
                                {order.logistica.google_maps_link && (
                                    <a href={order.logistica.google_maps_link} target="_blank" className="mt-2 flex items-center gap-1 text-blue-600 font-bold hover:underline">
                                        <MapPin size={14}/> Ver en Google Maps <ExternalLink size={12}/>
                                    </a>
                                )}
                            </>
                        ) : <span className="text-orange-500 italic">Sin dirección asignada</span>}
                    </div>
                )}
            </div>

            {/* --- DETALLE PRENDAS (Agregado para completar la vista) --- */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b"><h4 className="font-bold text-gray-700 text-sm flex items-center gap-2"><Receipt size={16}/> Detalle</h4></div>
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-50">
                    {order.detalle_prendas.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2">{item.cant}</td>
                        <td className="px-4 py-2">{item.item}</td>
                        <td className="px-4 py-2 text-right">S/ {item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            
            {/* PAGO */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
               <div className="flex justify-between font-bold text-gray-800 border-b pb-2">
                   {/* CORRECCIÓN: order.finanzas.total_final */}
                   <span>TOTAL:</span><span>S/ {order.finanzas.total_final.toFixed(2)}</span>
               </div>
               <div className={`mt-3 p-3 rounded flex justify-between ${order.finanzas.es_pagado ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                   <span className="font-bold text-sm">{order.finanzas.es_pagado ? "✅ PAGADO" : "❗ PENDIENTE DE PAGO"}</span>
                   {!order.finanzas.es_pagado && <span className="font-bold">Cobrar: S/ {getTotales().deuda.toFixed(2)}</span>}
               </div>
            </div>

          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t">
            <button onClick={handleContactar} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 flex justify-center items-center gap-2">
              <MessageCircle size={20}/> Contactar Cliente
            </button>
        </div>
      </div>
    </div>
  );
};