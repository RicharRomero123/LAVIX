import { Search, Eye, ArrowRight, CheckCircle, Package, Camera, Clock } from 'lucide-react';
import { Order, ProcessStep } from '../app/types';

interface PlantCardProps {
  order: Order;
  onOpenModal: (order: Order) => void;
  onAdvance?: (orderId: string) => void;
}

export function PlantCard({ order, onOpenModal, onAdvance }: PlantCardProps) {

  // Helper de colores
  const getProgressColor = (step: ProcessStep) => {
    switch(step) {
        case 'WASHING': return 'bg-blue-500';
        case 'DRYING': return 'bg-orange-500';
        case 'FINISHING': return 'bg-purple-500';
        case 'COMPLETED': return 'bg-green-500';
        default: return 'bg-gray-200';
    }
  };

  // NUEVO: Calcular Tiempo Transcurrido (Formato "2h 30m")
  const getTimeElapsed = () => {
    const diff = new Date().getTime() - new Date(order.startTime).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const isDelayed = (new Date().getTime() - new Date(order.startTime).getTime()) > (1000 * 60 * 120); // > 2 horas = Rojo

  // 1. PENDIENTE
  if (order.status === 'PENDING') {
    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm border-l-4 relative ${order.isPriority ? 'border-red-500' : 'border-gray-300'}`}>
            <div className="mb-2 flex justify-between items-start">
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Malla</span>
                    <h3 className="text-3xl font-black text-lavix-900">#{order.bagId}</h3>
                </div>
                {/* Badge de Tiempo */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${isDelayed ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                    <Clock size={10} /> {getTimeElapsed()}
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
                {order.isPriority && <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded">URGENTE</span>}
                <span className="text-xs text-gray-500 font-medium truncate">{order.clientName}</span>
                {order.photos && Object.keys(order.photos).length > 0 && <Camera size={14} className="text-gray-400" />}
            </div>

            <button onClick={() => onOpenModal(order)} className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2">
                <Search size={16} /> REVISAR Y LAVAR
            </button>
        </div>
    );
  }

  // 2. EN PROCESO
  if (order.status === 'IN_PROCESS') {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-blue-50 relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-black text-lavix-900">#{order.bagId}</h3>
                <button onClick={() => onOpenModal(order)} className="p-2 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold flex gap-1 items-center hover:bg-gray-100">
                    <Eye size={14} /> <span className="hidden sm:inline">DETALLES</span>
                </button>
            </div>

             {/* Barra de Progreso */}
             <div className="flex gap-1 h-2 mb-4 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${['WASHING', 'DRYING', 'FINISHING'].includes(order.step) ? 'bg-blue-500' : 'bg-gray-200'} flex-1 transition-colors duration-500`}></div>
                <div className={`h-full ${['DRYING', 'FINISHING'].includes(order.step) ? 'bg-orange-500' : 'bg-gray-200'} flex-1 transition-colors duration-500`}></div>
                <div className={`h-full ${order.step === 'FINISHING' ? 'bg-purple-500' : 'bg-gray-200'} flex-1 transition-colors duration-500`}></div>
            </div>

            <button 
                onClick={() => onAdvance?.(order.id)}
                className={`w-full py-4 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all ${getProgressColor(order.step)}`}
            >
                {order.step === 'WASHING' ? 'TERMINAR LAVADO' : order.step === 'DRYING' ? 'TERMINAR SECADO' : 'EMPAQUETAR'} <ArrowRight size={16} />
            </button>
            
            {/* Tiempo flotante */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-300">
                {getTimeElapsed()}
            </div>
        </div>
    );
  }

  // 3. LISTO
  if (order.status === 'READY') {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500 opacity-90 hover:opacity-100 transition-opacity cursor-pointer group"
             onClick={() => onOpenModal(order)}>
            <div className="flex justify-between items-center mb-1">
                <h3 className="text-xl font-black text-gray-800">#{order.bagId}</h3>
                <CheckCircle className="text-green-500" />
            </div>
            <p className="text-xs text-gray-500 font-medium">{order.clientName}</p>
            <div className="mt-2 text-xs font-bold text-green-700 bg-green-50 p-2 rounded flex gap-2 items-center justify-center">
                <Package size={14} /> LISTO PARA ENTREGA
            </div>
        </div>
    );
  }

  return null;
}