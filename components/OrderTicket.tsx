import { CheckCircle, Share2, Printer, X } from "lucide-react";
import { Product } from "../app/data";

interface OrderTicketProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    id: string;
    bagId: string;
    clientName: string;   // Nuevo
    clientPhone: string;  // Nuevo
    weight: number;
    weightCost: number;
    items: Record<string, number>;
    totalAmount: number;
    paymentStatus: 'PAID' | 'PENDING';
    productsRef: Product[]; // Referencia para buscar nombres
  } | null;
}

export function OrderTicket({ isOpen, onClose, orderData }: OrderTicketProps) {
  if (!isOpen || !orderData) return null;

  // Helper para buscar el nombre del producto por ID
  const getProdDetails = (id: string) => orderData.productsRef.find(p => p.id === id);

  // Lógica de Compartir
const handleShareWhatsApp = () => {
    // 1. Preparamos el detalle de items primero
    const itemIds = Object.keys(orderData.items);
    let itemsText = '';
    
    if (itemIds.length > 0) {
       itemsText = itemIds.map(id => {
          const p = getProdDetails(id);
          // Usamos un guion simple o bullet point estándar que WhatsApp lee bien
          return p ? `• ${orderData.items[id]}x ${p.name}` : null;
       }).filter(Boolean).join('\n');
    }

    // 2. Construimos el mensaje usando un Array (Más limpio y seguro)
    // Filtramos con Boolean para eliminar líneas que sean null o undefined
    const messageLines = [
        `Hola${orderData.clientName ? ' *' + orderData.clientName + '*' : ''}! 👋`,
        `Tu pedido en *LAVIX* ha sido registrado.`,
        ``, // Línea vacía para separar
        `🏷 *Malla:* ${orderData.bagId}`,
        `📅 *Fecha:* ${new Date().toLocaleDateString()}`,
        orderData.weight > 0 ? `⚖️ *Peso:* ${orderData.weight}kg` : null,
        itemsText ? `📦 *Artículos:*\n${itemsText}` : null,
        ``,
        `💰 *TOTAL: S/ ${orderData.totalAmount.toFixed(2)}*`,
        `📝 *Estado:* ${orderData.paymentStatus === 'PAID' ? 'PAGADO ✅' : 'PENDIENTE ⚠️'}`
    ].filter(line => line !== null);

    // Unimos todo con saltos de línea codificados
    const finalMessage = messageLines.join('\n');

    // 3. Determinamos el destino y Codificamos
    // Usamos 'api.whatsapp.com' que maneja mejor la codificación UTF-8 en móviles
    const phone = orderData.clientPhone.replace(/\D/g, '');
    
    let baseUrl = 'https://api.whatsapp.com/send';
    
    if (phone.length >= 9) {
        // Asumiendo Perú (51), agregamos si falta
        const fullPhone = phone.startsWith('51') ? phone : `51${phone}`;
        baseUrl += `?phone=${fullPhone}`;
    } else {
        // Si no hay número, dejará elegir contacto, pero necesitamos el signo '?' para el texto
        baseUrl += `?`; 
    }

    // AÑADIMOS EL TEXTO CODIFICADO
    // encodeURIComponent es vital aquí. Convierte los emojis en códigos %F0%9F...
    // Si ya hay parámetros (phone), usamos '&', si no, el primer parámetro es text (aunque api.whatsapp suele pedir phone primero)
    const separator = baseUrl.includes('?') ? '&' : '?';
    const finalUrl = `${baseUrl}${separator}text=${encodeURIComponent(finalMessage)}`;

    window.open(finalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop Oscuro */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* EL TICKET (Efecto Papel) */}
      <div className="bg-white w-full max-w-sm rounded-lg shadow-2xl relative z-20 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Cabecera Azul */}
        <div className="bg-lavix-900 p-6 text-center text-white relative">
            {/* Botón Cerrar (X) */}
            <div className="absolute top-4 right-4 cursor-pointer hover:bg-white/10 p-1 rounded-full transition-colors" onClick={onClose}>
                <X size={20} />
            </div>
            
            {/* Icono Éxito */}
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 text-green-500 shadow-lg ring-4 ring-white/20">
                <CheckCircle size={36} strokeWidth={3} />
            </div>
            
            <h2 className="text-xl font-black tracking-tight">¡ORDEN REGISTRADA!</h2>
            <p className="text-lavix-400 text-xs uppercase font-bold tracking-widest mt-1">LAVANDERÍA LAVIX</p>
        </div>

        {/* Cuerpo del Ticket */}
        <div className="p-6 bg-white relative">
            
            {/* Datos Principales */}
            <div className="flex justify-between items-end border-b-2 border-dashed border-gray-200 pb-4 mb-4">
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">N° Malla</p>
                    <p className="text-4xl font-black text-lavix-900 tracking-tighter">{orderData.bagId}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Cliente</p>
                    <p className="text-sm font-bold text-gray-800 capitalize max-w-[120px] truncate">
                        {orderData.clientName || 'General'}
                    </p>
                    <p className="text-xs text-gray-500">{orderData.clientPhone || '-'}</p>
                </div>
            </div>

            {/* Lista de Detalles */}
            <div className="space-y-2 mb-6 text-sm">
                {/* Fila Peso */}
                {orderData.weight > 0 && (
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-gray-700">
                            <span className="font-bold bg-gray-100 px-1.5 rounded text-xs">1x</span>
                            <span>Lavado x Kilo ({orderData.weight}kg)</span>
                        </div>
                        <span className="font-bold text-gray-900">S/ {orderData.weightCost.toFixed(2)}</span>
                     </div>
                )}

                {/* Filas Items */}
                {Object.entries(orderData.items).map(([id, qty]) => {
                    const product = getProdDetails(id);
                    if(!product) return null;
                    return (
                        <div key={id} className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-700">
                                <span className="font-bold bg-gray-100 px-1.5 rounded text-xs">{qty}x</span>
                                <span className="line-clamp-1">{product.name}</span>
                            </div>
                            <span className="font-bold text-gray-900">S/ {(product.price * qty).toFixed(2)}</span>
                        </div>
                    );
                })}
            </div>

            {/* Caja de Totales */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">Estado</span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded ${orderData.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                        {orderData.paymentStatus === 'PAID' ? 'PAGADO' : 'PENDIENTE'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-gray-800">TOTAL</span>
                    <span className="text-3xl font-black text-lavix-900">S/ {orderData.totalAmount.toFixed(2)}</span>
                </div>
            </div>

            {/* Botones de Acción */}
            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={handleShareWhatsApp}
                    className="flex flex-col items-center justify-center p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors gap-1 active:scale-95"
                >
                    <Share2 size={20} />
                    <span className="text-[10px] font-black tracking-wide">WHATSAPP</span>
                </button>
                <button 
                    onClick={() => alert("Función de Impresora Bluetooth (Próximamente)")} 
                    className="flex flex-col items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors gap-1 active:scale-95"
                >
                    <Printer size={20} />
                    <span className="text-[10px] font-black tracking-wide">IMPRIMIR</span>
                </button>
            </div>

            {/* Link para cerrar */}
            <button onClick={onClose} className="w-full mt-4 py-2 text-lavix-400 font-bold text-xs hover:text-lavix-600 transition-colors">
                Cerrar y Nueva Orden
            </button>
        </div>
        
        {/* Decoración Dientes de Sierra (CSS Trick simple) */}
        <div className="h-4 bg-lavix-900" style={{
            backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%), linear-gradient(-45deg, #ffffff 25%, transparent 25%)',
            backgroundSize: '10px 10px',
            backgroundPosition: '0 0, 0 5px'
        }}></div>

      </div>
    </div>
  );
}