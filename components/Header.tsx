import { Search } from 'lucide-react';

interface HeaderProps {
  bagId: string;
  setBagId: (val: string) => void;
  weight: string;
  setWeight: (val: string) => void;
  weightCost: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export function Header({ 
  bagId, setBagId, weight, setWeight, weightCost, searchTerm, setSearchTerm 
}: HeaderProps) {
  return (
    <div className="bg-white p-4 shadow-sm sticky top-0 z-20 border-b border-gray-100">
      <h1 className="text-xl font-black text-lavix-900 mb-4">Nueva Orden</h1>
      
      {/* 1. SECCIÓN PRINCIPAL: MALLA Y PESO (Grande y Clara) */}
      <div className="flex gap-4 items-start mb-4">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-lavix-400 uppercase">N° Malla</label>
          <input 
            type="number" 
            placeholder="15"
            value={bagId}
            onChange={(e) => setBagId(e.target.value)}
            className="w-full text-4xl font-black p-1 border-b-2 border-lavix-600 focus:outline-none bg-white text-lavix-900 rounded-t-lg placeholder:text-gray-200"
          />
        </div>

        <div className="w-1/2 bg-blue-50 p-2 rounded-lg border border-blue-100">
           <label className="text-[10px] font-bold text-lavix-600 uppercase">Peso</label>
           <div className="flex items-center">
              <input 
                type="number" 
                placeholder="0.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full text-3xl font-bold bg-transparent focus:outline-none text-lavix-900 placeholder:text-blue-200"
              />
              <span className="text-lavix-400 text-sm font-bold">kg</span>
           </div>
           <div className="text-right text-xs font-bold text-lavix-600">S/ {weightCost.toFixed(2)}</div>
        </div>
      </div>

      {/* 2. BUSCADOR (Discreto) */}
      <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar prenda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-gray-100 border-none rounded-xl font-medium focus:ring-2 focus:ring-lavix-600 focus:bg-white transition-all outline-none text-sm"
          />
      </div>
    </div>
  );
}