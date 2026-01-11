import { Droplets } from 'lucide-react';
import { Order, TabView } from '../app/types';

interface PlantHeaderProps {
  orders: Order[];
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
}

export function PlantHeader({ orders, activeTab, setActiveTab }: PlantHeaderProps) {
  
  const countByStatus = (status: string) => orders.filter(o => o.status === status).length;

  // TAB BUTTON
  const TabButton = ({ label, count, isActive, onClick, activeColor }: any) => {
    const colorClasses: any = {
        blue: 'border-blue-600 text-blue-600',
        orange: 'border-orange-500 text-orange-600',
        green: 'border-green-500 text-green-600'
    };
    return (
        <button 
            onClick={onClick}
            className={`flex-1 pb-3 text-xs font-bold border-b-4 transition-all flex justify-center gap-2 whitespace-nowrap
            ${isActive ? colorClasses[activeColor] : 'border-transparent text-gray-400'}`}
        >
            {label}
            {count > 0 && <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-[10px]">{count}</span>}
        </button>
    );
  }

  return (
    // CORRECCIÓN Z-INDEX: z-30 para estar sobre el contenido pero bajo el Modal
    <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-xl font-black text-lavix-900 flex items-center gap-2">
                <Droplets className="text-blue-600" /> Planta
            </h1>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">
                {orders.length} Activos
            </div>
        </div>
        
        <div className="flex px-2 pt-2 gap-1 overflow-x-auto hide-scrollbar">
            <TabButton label="POR INICIAR" count={countByStatus('PENDING')} isActive={activeTab === 'TAB_PENDING'} onClick={() => setActiveTab('TAB_PENDING')} activeColor="blue" />
            <TabButton label="PROCESO" count={countByStatus('IN_PROCESS')} isActive={activeTab === 'TAB_PROCESS'} onClick={() => setActiveTab('TAB_PROCESS')} activeColor="orange" />
            <TabButton label="LISTOS" count={countByStatus('READY')} isActive={activeTab === 'TAB_READY'} onClick={() => setActiveTab('TAB_READY')} activeColor="green" />
        </div>
    </div>
  );
}