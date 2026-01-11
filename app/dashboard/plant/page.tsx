"use client";

import React, { useState } from 'react';
import { ListFilter } from 'lucide-react';
import { Order, TabView } from '@/app/types';
import { PlantHeader } from '@/components/PlantHeader';
import { PlantCard } from '@/components/PlantCard';
import { PlantModal } from '@/components/PlantModal';


// TUS DATOS DE PRUEBA (MOCK_ORDERS) SE MANTIENEN IGUAL QUE ANTES
const MOCK_ORDERS: Order[] = [
  // ... pega aquí tus datos de casuística ...
    { 
        id: '5', bagId: '101', clientName: 'Dra. Polo', weight: 2.0, 
        status: 'PENDING', step: 'WAITING', startTime: new Date(Date.now() - 1000 * 60 * 10), // 10 min
        type: 'ROPA', isPriority: true, 
        items: [{ name: 'Bata Médica', qty: 3, category: 'ROPA' }]
    },
    { 
        id: '2', bagId: '08', clientName: 'Ana Maria', weight: 0, 
        status: 'PENDING', step: 'WAITING', startTime: new Date(Date.now() - 1000 * 60 * 180), // 3 horas
        type: 'ZAPATILLAS', isPriority: false,
        items: [{ name: 'Zapatillas Nike', qty: 1, category: 'ZAPATILLAS' }]
    }
];

export default function PlantPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState<TabView>('TAB_PENDING');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // LOGICA (Igual que antes)
  const handleAdvanceOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
        if (o.id !== orderId) return o;
        if (o.step === 'WASHING') return { ...o, step: 'DRYING' };
        if (o.step === 'DRYING') return { ...o, step: 'FINISHING' };
        if (o.step === 'FINISHING') return { ...o, step: 'COMPLETED', status: 'READY' };
        return o;
    }));
  };

  const handleStartProcess = (photos: Record<string, string>) => {
    if (!activeOrder) return;
    setOrders(prev => prev.map(o => o.id === activeOrder.id ? { ...o, status: 'IN_PROCESS', step: 'WASHING', photos } : o));
    setActiveOrder(null);
    setActiveTab('TAB_PROCESS'); 
  };

  const handleFinishReady = () => {
    setActiveOrder(null);
    alert("¡Paquete cerrado!");
  };

  // ORDENAMIENTO (Prioridad + Tiempo)
  const getSortedOrders = () => {
      let filtered = orders.filter(o => {
          if (activeTab === 'TAB_PENDING') return o.status === 'PENDING';
          if (activeTab === 'TAB_PROCESS') return o.status === 'IN_PROCESS';
          if (activeTab === 'TAB_READY') return o.status === 'READY';
          return false;
      });

      return filtered.sort((a, b) => {
          if (a.isPriority && !b.isPriority) return -1;
          if (!a.isPriority && b.isPriority) return 1;
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
      });
  };

  const displayOrders = getSortedOrders();

  return (
    // CORRECCIÓN PADDING: pb-32 para que el contenido no quede bajo el Nav Bar
    <div className="min-h-screen bg-gray-50 pb-32 relative">
      
      <PlantHeader orders={orders} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="p-4 space-y-3">
        {displayOrders.length > 0 ? (
            displayOrders.map(order => (
                <PlantCard 
                    key={order.id} 
                    order={order} 
                    onOpenModal={setActiveOrder}
                    onAdvance={handleAdvanceOrder}
                />
            ))
        ) : (
            <div className="text-center py-10 opacity-50">
                <ListFilter className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm font-bold text-gray-400">Todo limpio por aquí</p>
            </div>
        )}
      </div>

      <PlantModal 
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
        onConfirmStart={handleStartProcess}
        onConfirmReady={handleFinishReady}
      />
    </div>
  );
}