import { useState } from "react";
import { CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import { Product } from "../app/data";

interface SummaryBarProps {
  weightValue: number;
  weightCost: number;
  extrasCost: number;
  totalItems: number;
  totalFinal: number;
  bagId: string;
  cart: Record<string, number>;
  products: Product[];
  onCheckout: () => void;
}

export function SummaryBar({ 
  weightValue, weightCost, extrasCost, totalItems, totalFinal, bagId, cart, products, onCheckout 
}: SummaryBarProps) {
  
  const [isExpanded, setIsExpanded] = useState(false);

  // Si no hay nada, no renderizamos nada
  if (weightValue === 0 && totalItems === 0) return null;

  return (
    // CORRECCIÓN 1: Z-Index alto (z-[60]) para estar SOBRE el menú de navegación.
    // TRUCO PRO: Usamos 'pointer-events-none' cuando está colapsado. 
    // Esto permite que el usuario pueda dar clic al menú de abajo a través del área transparente (padding),
    // pero reactivamos 'pointer-events-auto' en la tarjeta blanca para que esa sí funcione.
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[60] flex flex-col items-center transition-all duration-300 
      ${isExpanded 
          ? 'h-full bg-black/50 justify-end pb-0 pointer-events-auto'  // Expandido: Bloquea todo (Overlay)
          : 'h-auto pb-20 pointer-events-none'                         // Colapsado: Deja pasar clics en zonas vacías
      }`}
    >
      
      {/* Backdrop para cerrar al hacer clic fuera (Solo visible si expandido) */}
      {isExpanded && <div className="absolute inset-0 w-full h-full" onClick={() => setIsExpanded(false)}></div>}

      {/* LA TARJETA BLANCA */}
      <div className={`w-full md:w-[400px] bg-white shadow-[0_-5px_30px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col pointer-events-auto
          ${isExpanded 
            ? 'rounded-t-3xl p-6 relative z-10' 
            : 'rounded-t-2xl mx-4 p-4 border border-gray-100 mb-0 md:mb-4'
          }
      `}>
        
        {/* Flecha Toggle */}
        <div className="flex justify-center mb-2 cursor-pointer p-2 -mt-2" onClick={() => setIsExpanded(!isExpanded)}>
             {isExpanded ? <ChevronDown className="text-gray-300" /> : <ChevronUp className="text-gray-300 animate-bounce" />}
        </div>

        {/* --- DETALLE EXPANDIDO --- */}
        {isExpanded && (
            <div className="mb-4 animate-in slide-in-from-bottom-10 fade-in duration-200 max-h-[50vh] overflow-y-auto pr-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalle del Pedido</p>
                
                {/* Ropa x Kilo */}
                {weightValue > 0 && (
                    <div className="flex justify-between py-3 border-b border-gray-100 items-center">
                        <div className="flex gap-3 items-center">
                             <span className="bg-blue-100 text-blue-700 font-bold px-2 py-1 rounded text-xs">1x</span>
                             <span className="text-gray-700 font-medium">Servicio Lavado ({weightValue}kg)</span>
                        </div>
                        <span className="font-bold text-gray-900">S/ {weightCost.toFixed(2)}</span>
                    </div>
                )}

                {/* Items del Carrito */}
                {Object.entries(cart).map(([id, qty]) => {
                    const prod = products.find(p => p.id === id);
                    if(!prod) return null;
                    return (
                        <div key={id} className="flex justify-between py-3 border-b border-gray-100 last:border-0 items-center">
                            <div className="flex gap-3 items-center">
                                <span className="bg-lavix-100 text-lavix-700 font-bold px-2 py-1 rounded text-xs">{qty}x</span>
                                <span className="text-gray-700 font-medium">{prod.name}</span>
                            </div>
                            <span className="font-bold text-gray-900">S/ {(prod.price * qty).toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>
        )}

        {/* --- RESUMEN COLAPSADO (Siempre Visible) --- */}
        {!isExpanded && (
            <div className="cursor-pointer" onClick={() => setIsExpanded(true)}>
                <div className="flex justify-between text-xs text-gray-400 mb-1 font-bold uppercase">
                    <span>Resumen</span>
                    <span className="text-lavix-600 underline decoration-dotted text-[10px]">Ver detalle</span>
                </div>
                
                {/* CORRECCIÓN 2: Texto Genérico */}
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="truncate max-w-[200px] font-medium flex gap-2">
                        {weightValue > 0 && <span>⚖️ {weightValue}kg </span>} 
                        {/* Aquí cambiamos 'prendas' por 'art.' (artículos) */}
                        {totalItems > 0 && <span>📦 + {totalItems} art.</span>}
                    </span>
                    <span className="font-bold text-lavix-900">Subtotal: S/ {(weightCost + extrasCost).toFixed(2)}</span>
                </div>
                <div className="border-t border-dashed border-gray-300 my-2"></div>
            </div>
        )}
        
        {/* TOTAL Y BOTÓN DE ACCIÓN */}
        <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 font-bold text-sm">TOTAL</span>
            <span className="text-3xl font-black text-lavix-900">S/ {totalFinal.toFixed(2)}</span>
        </div>

        <button 
            onClick={onCheckout}
            disabled={!bagId}
            className={`w-full py-4 rounded-xl shadow-lg font-black text-lg flex items-center justify-center gap-3 transition-all
            ${bagId 
                ? 'bg-lavix-900 text-white hover:bg-black hover:scale-[1.02] active:scale-95' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
            {!bagId ? 'MALLA REQUERIDA' : 'COBRAR'} 
            <CheckCircle size={24} className={!bagId ? 'text-gray-400' : 'text-brand-cyan'} />
        </button>
      </div>
    </div>
  );
}