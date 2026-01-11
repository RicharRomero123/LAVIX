import { useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2, QrCode, Banknote, CreditCard, User, Phone, Zap, Clock } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  totalAmount: number;
  onClose: () => void;
  onConfirm: (status: 'PAID' | 'PENDING', method: string | null) => void;
  isSaving: boolean;
  
  // Props de Cliente
  clientName: string;
  setClientName: (val: string) => void;
  clientPhone: string;
  setClientPhone: (val: string) => void;

  // NUEVOS PROPS DE PRIORIDAD
  isPriority: boolean;
  setIsPriority: (val: boolean) => void;
}

export function PaymentModal({ 
  isOpen, totalAmount, onClose, onConfirm, isSaving, 
  clientName, setClientName, clientPhone, setClientPhone,
  isPriority, setIsPriority // <--- Recibimos esto
}: PaymentModalProps) {
  
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'PAID'>('PENDING');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'YAPE' | 'PLIN' | 'CARD'>('CASH');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center pb-4 md:pb-0 px-2 md:px-0">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-3xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-gray-800">Cerrar Orden</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* --- NUEVO: SELECTOR DE VELOCIDAD --- */}
        <div className="bg-gray-50 p-1 rounded-xl flex mb-6 border border-gray-100 relative overflow-hidden">
             {/* Slider visual (Opcional, css simple) */}
             <button 
                onClick={() => setIsPriority(false)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all z-10
                ${!isPriority ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <Clock size={16} /> Estándar
             </button>
             <button 
                onClick={() => setIsPriority(true)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all z-10
                ${isPriority ? 'bg-red-500 text-white shadow-sm' : 'text-gray-400 hover:text-red-400'}`}
             >
                <Zap size={16} /> EXPRESS
             </button>
        </div>

        {/* Total a Pagar */}
        <div className="text-center mb-6">
            <p className="text-gray-400 font-bold uppercase text-xs tracking-wider">Total a Cobrar</p>
            <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-5xl font-black text-lavix-900">S/ {totalAmount.toFixed(2)}</p>
                {/* Indicador visual extra */}
                {isPriority && <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-1 rounded-full self-start mt-2">URGENTE</span>}
            </div>
        </div>

        {/* Datos del Cliente */}
        <div className="bg-white border border-gray-200 p-4 rounded-2xl mb-6 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1">
                <User size={12} /> Cliente
            </p>
            <div className="space-y-3">
                <input 
                    type="tel" 
                    placeholder="Celular (999...)" 
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-lavix-600 rounded-xl text-sm font-bold text-lavix-900 outline-none transition-all"
                />
                <input 
                    type="text" 
                    placeholder="Nombre Completo" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-lavix-600 rounded-xl text-sm font-bold text-lavix-900 outline-none capitalize"
                />
            </div>
        </div>

        {/* Selector de Estado Pago */}
        <div className="grid grid-cols-2 gap-2 mb-6">
            <button 
                onClick={() => setPaymentStatus('PAID')} 
                className={`py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 border-2
                ${paymentStatus === 'PAID' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400 bg-white'}`}
            >
                <CheckCircle size={18} /> PAGAR
            </button>
            <button 
                onClick={() => setPaymentStatus('PENDING')} 
                className={`py-3 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 border-2
                ${paymentStatus === 'PENDING' ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-400 bg-white'}`}
            >
                <AlertCircle size={18} /> DEUDA
            </button>
        </div>

        {/* Métodos de Pago */}
        {paymentStatus === 'PAID' && (
            <div className="grid grid-cols-2 gap-3 mb-6 animate-in fade-in zoom-in-95 duration-200">
                {[
                    { id: 'YAPE', label: 'YAPE', color: 'purple', icon: QrCode },
                    { id: 'PLIN', label: 'PLIN', color: 'cyan', icon: QrCode },
                    { id: 'CASH', label: 'EFECTIVO', color: 'green', icon: Banknote },
                    { id: 'CARD', label: 'TARJETA', color: 'blue', icon: CreditCard },
                ].map((m) => (
                    <button 
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id as any)} 
                        className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all
                        ${paymentMethod === m.id 
                            ? `border-${m.color}-500 bg-${m.color}-50 text-${m.color}-700 shadow-sm` 
                            : 'border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                    >
                        <m.icon size={20} /> <span className="font-bold text-xs">{m.label}</span>
                    </button>
                ))}
            </div>
        )}

        <button 
            onClick={() => onConfirm(paymentStatus, paymentStatus === 'PAID' ? paymentMethod : null)}
            disabled={isSaving}
            className={`w-full py-4 rounded-xl font-black text-lg text-white shadow-xl transition-all flex items-center justify-center gap-2
            ${isPriority ? 'bg-red-500 hover:bg-red-600' : (paymentStatus === 'PAID' ? 'bg-green-600 hover:bg-green-700' : 'bg-orange-500 hover:bg-orange-600')}`}
        >
            {isSaving ? (
                <><Loader2 className="animate-spin" /> GUARDANDO...</>
            ) : (
                <>
                    {paymentStatus === 'PAID' ? 'CONFIRMAR TODO' : 'GUARDAR ORDEN'} 
                    {isPriority ? <Zap size={20} fill="currentColor" /> : <CheckCircle size={20} />}
                </>
            )}
        </button>
      </div>
    </div>
  );
}