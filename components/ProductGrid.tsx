// Archivo: src/app/dashboard/reception/components/ProductGrid.tsx
import { ShoppingBag, Shirt, Box, Scissors, Footprints, Accessibility, Plus, Minus } from 'lucide-react';
import { Product } from '../app/data';

interface ProductGridProps {
  products: Product[]; // Lista YA filtrada
  cart: Record<string, number>;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  // Props para Tabs
  categories: string[];
  activeTab: string;
  setActiveTab: (cat: string) => void;
}

export function ProductGrid({ 
  products, cart, onAdd, onRemove, categories, activeTab, setActiveTab 
}: ProductGridProps) {

  // Helper para iconos dinámicos
  const getIcon = (cat: string) => {
    switch(cat) {
      case 'ZAPATILLAS': return Footprints;
      case 'TERNOS': return Shirt;
      case 'VESTIDOS': return Accessibility;
      case 'TEÑIDOS': return Scissors;
      case 'HOGAR': return Box;
      default: return ShoppingBag;
    }
  };

  return (
    <>
      {/* 1. TABS DE CATEGORÍAS */}
      <div className="bg-white py-2 px-4 overflow-x-auto whitespace-nowrap hide-scrollbar shadow-sm sticky top-[196px] z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`mr-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border
              ${activeTab === cat 
                ? 'bg-lavix-900 text-white border-lavix-900' 
                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2. GRILLA DE PRODUCTOS */}
      <div className="p-4 grid grid-cols-2 gap-3 pb-32">
        {products.length > 0 ? (
          products.map((product) => {
            const count = cart[product.id] || 0;
            const Icon = getIcon(product.category);

            return (
              <div 
                key={product.id} 
                onClick={() => onAdd(product.id)}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-95 duration-150 cursor-pointer min-h-[130px] select-none
                  ${count > 0 ? 'border-lavix-600 bg-blue-50/50' : 'border-gray-100 bg-white shadow-sm'}`}
              >
                <Icon size={28} className={count > 0 ? 'text-lavix-600' : 'text-gray-300'} />
                
                <span className="mt-2 font-bold text-lavix-900 text-center text-sm line-clamp-2 leading-tight">
                  {product.name}
                </span>
                
                <span className="text-xs text-lavix-600 font-bold mt-1">
                  S/ {product.price.toFixed(2)}
                </span>

                {/* Badge Cantidad */}
                {count > 0 && (
                  <div className="absolute top-2 right-2 bg-lavix-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    {count}
                  </div>
                )}
                
                {/* Controles +/- */}
                {count > 0 && (
                  <div className="flex items-center gap-3 mt-2 bg-white rounded-full shadow-sm p-1 border border-gray-200" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => onRemove(product.id)} className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                        <Minus size={16} />
                    </button>
                    <button onClick={() => onAdd(product.id)} className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                        <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-10 text-gray-400">
            <p>No hay resultados</p>
          </div>
        )}
      </div>
    </>
  );
}