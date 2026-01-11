"use client";

import React, { useState, useMemo } from 'react';
import { PRODUCTS, PRICE_PER_KILO } from '@/app/data';
import { Header } from '@/components/Header';
import { ProductGrid } from '@/components/ProductGrid';
import { SummaryBar } from '@/components/SummaryBar';
import { PaymentModal } from '@/components/PaymentModal';
import { OrderTicket } from '@/components/OrderTicket';


export default function ReceptionPage() {
  // ESTADOS CLIENTE
  const [clientPhone, setClientPhone] = useState('');
  const [clientName, setClientName] = useState('');

  // ESTADOS OPERATIVOS
  const [activeTab, setActiveTab] = useState('TODOS');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [bagId, setBagId] = useState(''); 
  const [weight, setWeight] = useState(''); 
  const [isPriority, setIsPriority] = useState(false);
  
  // MODALES
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null); 

  // LÓGICA
  const categories = useMemo(() => ['TODOS', ...Array.from(new Set(PRODUCTS.map(p => p.category)))], []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
        return (activeTab === 'TODOS' || p.category === activeTab) &&
               p.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [activeTab, searchTerm]);

  const weightValue = parseFloat(weight) || 0;
  const weightCost = weightValue * PRICE_PER_KILO;
  
  const extrasCost = Object.entries(cart).reduce((total, [id, qty]) => {
    const p = PRODUCTS.find(prod => prod.id === id);
    return total + (p ? p.price * qty : 0);
  }, 0);
  
  const totalFinal = weightCost + extrasCost;
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  // HANDLERS
  const addToCart = (id: string) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  
  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount <= 0) { const { [id]: _, ...rest } = prev; return rest; }
      return { ...prev, [id]: newCount };
    });
  };

  // Guardar Orden (SIN FOTOS AQUÍ)
  const handleConfirmOrder = async (status: 'PAID' | 'PENDING', method: string | null) => {
    setIsSaving(true);
    
    const finalOrder = {
        id: crypto.randomUUID(),
        bagId,
        clientPhone, 
        clientName,  
        isPriority,  
        weight: weightValue,
        weightCost, 
        items: cart,
        // photos: itemPhotos, <--- ELIMINADO
        totalAmount: totalFinal,
        paymentStatus: status,
        paymentMethod: method,
        productsRef: PRODUCTS, 
        createdAt: new Date().toISOString()
    };

    console.log("📤 GUARDANDO ORDEN (RECEPCIÓN):", finalOrder);
    
    setTimeout(() => {
        setIsSaving(false);
        setIsPaymentModalOpen(false);
        setLastOrder(finalOrder);    
        setIsTicketOpen(true);       
    }, 1500);
  };

  const handleCloseTicket = () => {
    setIsTicketOpen(false);
    setCart({});
    setBagId('');
    setWeight('');
    setSearchTerm('');
    setClientName('');
    setClientPhone('');
    setIsPriority(false);
    setActiveTab('TODOS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      <Header 
        bagId={bagId} setBagId={setBagId} weight={weight} setWeight={setWeight} weightCost={weightCost} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
      />

      {/* AQUÍ YA NO PASAMOS itemPhotos NI onAddPhoto */}
      <ProductGrid 
        products={filteredProducts}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
        categories={categories}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <SummaryBar 
        weightValue={weightValue} weightCost={weightCost} extrasCost={extrasCost} totalItems={totalItems} totalFinal={totalFinal} bagId={bagId} cart={cart} products={PRODUCTS} onCheckout={() => setIsPaymentModalOpen(true)}
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen} totalAmount={totalFinal} onClose={() => setIsPaymentModalOpen(false)} onConfirm={handleConfirmOrder} isSaving={isSaving} clientName={clientName} setClientName={setClientName} clientPhone={clientPhone} setClientPhone={setClientPhone} isPriority={isPriority} setIsPriority={setIsPriority}
      />

      <OrderTicket 
        isOpen={isTicketOpen} onClose={handleCloseTicket} orderData={lastOrder}
      />
    </div>
  );
}