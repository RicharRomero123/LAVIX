import { useState, useEffect } from 'react';
import { X, Camera, CheckCircle, AlertTriangle, CheckSquare, Clock } from 'lucide-react';
import { Order } from '../app/types';

interface PlantModalProps {
  order: Order | null;
  onClose: () => void;
  onConfirmStart: (photos: Record<string, string>) => void;
  onConfirmReady: () => void;
}

export function PlantModal({ order, onClose, onConfirmStart, onConfirmReady }: PlantModalProps) {
  const [tempPhotos, setTempPhotos] = useState<Record<string, string>>({});
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (order) {
        setTempPhotos(order.photos || {});
        setPackedItems({});
    }
  }, [order]);

  if (!order) return null;

  const handleCapture = (itemName: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setTempPhotos(p => ({...p, [itemName]: reader.result as string}));
    reader.readAsDataURL(file);
  };

  const headerColor = order.status === 'PENDING' ? 'bg-gray-900' 
                    : order.status === 'IN_PROCESS' ? 'bg-blue-600' 
                    : 'bg-green-600';

  return (
    // CORRECCIÓN Z-INDEX: z-[110] para asegurar que esté ENCIMA de todo (NavBar, Header, etc.)
    <div className="fixed inset-0 z-[110] flex items-end justify-center md:items-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="bg-white w-full max-w-lg rounded-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col shadow-2xl">
            
            {/* Header */}
            <div className={`p-4 text-white flex justify-between items-center ${headerColor}`}>
                <div>
                    <h2 className="text-lg font-black flex items-center gap-2">
                        Malla #{order.bagId}
                        {order.status === 'READY' && <CheckSquare size={18} />}
                    </h2>
                    <p className="text-xs opacity-80 flex items-center gap-1">
                        <Clock size={10} /> Ingreso: {order.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                </div>
                <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors"><X /></button>
            </div>

            {/* Contenido Scrollable */}
            <div className="p-4 overflow-y-auto flex-1">
                
                {/* Fotos */}
                {Object.keys(order.photos || {}).length > 0 && (
                    <div className="mb-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1"><Camera size={10}/> Evidencias</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {Object.entries(order.photos || {}).map(([name, url]) => (
                                <div key={name} className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-300 relative group">
                                    <img src={url} className="w-full h-full object-cover" />
                                    <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] p-0.5 text-center truncate">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Checklist Items */}
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Contenido</p>
                <div className="space-y-2">
                    {order.items.map((item, idx) => (
                        <div key={idx} className={`flex justify-between items-center p-3 rounded-lg border transition-colors
                            ${packedItems[idx] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100'}`}>
                            
                            <div className="font-bold text-gray-800 text-sm">{item.qty}x {item.name}</div>
                            
                            {/* Acciones Condicionales */}
                            {order.status === 'PENDING' ? (
                                <label className={`w-10 h-10 flex items-center justify-center rounded-lg border cursor-pointer ${tempPhotos[item.name] ? 'bg-green-100 border-green-500' : 'bg-gray-50'}`}>
                                    {tempPhotos[item.name] ? <CheckCircle size={16} className="text-green-600"/> : <Camera size={18} className="text-gray-400"/>}
                                    <input type="file" accept="image/*" capture="environment" className="hidden" 
                                        onChange={(e) => e.target.files?.[0] && handleCapture(item.name, e.target.files[0])} 
                                    />
                                </label>
                            ) : order.status === 'READY' ? (
                                <button 
                                    onClick={() => setPackedItems(p => ({...p, [idx]: !p[idx]}))}
                                    className={`w-8 h-8 rounded border flex items-center justify-center transition-all active:scale-95
                                    ${packedItems[idx] ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}
                                >
                                    <CheckCircle size={16} />
                                </button>
                            ) : (
                                <span className="text-xs text-gray-400 font-bold bg-gray-100 px-2 py-1 rounded">OK</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                {order.status === 'PENDING' && (
                    <button onClick={() => onConfirmStart(tempPhotos)} className="w-full py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 shadow-lg active:scale-95 transition-transform">
                        CONFIRMAR Y LAVAR
                    </button>
                )}
                {order.status === 'READY' && (
                    <button onClick={onConfirmReady} className="w-full py-3 bg-green-600 text-white font-black rounded-xl hover:bg-green-700 shadow-lg active:scale-95 transition-transform">
                        CERRAR (EN ESTANTE)
                    </button>
                )}
                {order.status === 'IN_PROCESS' && (
                    <button onClick={onClose} className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100">
                        CERRAR VISTA
                    </button>
                )}
            </div>
        </div>
    </div>
  );
}