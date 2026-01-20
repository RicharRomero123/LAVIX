"use client";

import { useState, useEffect } from "react";
import { Receipt, Truck, CheckCircle2, MapPin, Camera, Link as LinkIcon, Send, ChevronLeft, Phone, Video, MoreVertical, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STATIC_HISTORY = {
  id: 0,
  text: "Gracias por tu preferencia en el pedido anterior. ⭐⭐⭐⭐⭐",
  time: "Ayer",
  type: "system",
  subtext: "",
  action: "",
  floating: { icon: CheckCircle2, label: "", value: "", color: "", pos: "", rot: "" } 
};

// AJUSTE DE POSICIONES (Más separadas y rotadas)
const CHAT_SEQUENCE = [
  {
    id: 1,
    type: "ticket",
    text: "Hola Juan 👋, recibimos tu pedido #4092. Son 3 prendas.",
    subtext: "Ver Boleta y Fotos 📸",
    time: "10:00 AM",
    action: "Enviar Ticket",
    floating: { 
        icon: LinkIcon, 
        label: "Link de Pago", 
        value: "Generado (Yape/Plin)", 
        color: "bg-blue-500", 
        // Derecha: Más alejado (-right-60)
        pos: "top-20 -right-60", 
        rot: "rotate-[6deg]"
    }
  },
  {
    id: 2,
    type: "ready",
    text: "¡Tu ropa está lista! ✨ Quedó impecable. Total: S/ 45.00",
    subtext: "Pagar ahora",
    time: "04:30 PM",
    action: "Avisar Listo",
    floating: { 
        icon: Camera, 
        label: "Evidencia", 
        value: "3 Fotos guardadas", 
        color: "bg-purple-500", 
        // Izquierda: Ajustado para no chocar
        pos: "bottom-40 -left-48", 
        rot: "-rotate-[4deg]" 
    }
  },
  {
    id: 3,
    type: "delivery",
    text: "Carlos (Motorizado) va en camino 🛵. Llega en 15 min.",
    subtext: "Ver ubicación en vivo 📍",
    time: "05:15 PM",
    action: "Enviar Delivery",
    floating: { 
        icon: MapPin, 
        label: "Ruta Logística", 
        value: "Destino: Miraflores", 
        color: "bg-orange-500", 
        // Derecha: Más alejado y arriba
        pos: "top-40 -right-64", 
        rot: "rotate-[3deg]" 
    }
  }
];

export const MockupWhatsApp = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([0]); 
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next > CHAT_SEQUENCE.length) {
            setVisibleMessages([0]); 
            return 0;
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentStep > 0 && currentStep <= CHAT_SEQUENCE.length) {
      setVisibleMessages(prev => [...prev, currentStep]);
    }
  }, [currentStep]);

  return (
    // CAMBIO CLAVE: "ml-auto" empuja todo a la derecha. "pl-12 md:pl-24" crea el espacio con el texto de la izquierda.
    <div className="relative w-full max-w-[700px] ml-auto py-10 pl-12 md:pl-24 pr-4 flex flex-col items-center">
      
      {/* TELÉFONO */}
      <div className="relative w-full max-w-[380px] bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] h-[520px] z-20 flex flex-col border-[8px] border-white">
        
        {/* HEADER */}
        <div className="bg-[#008069] p-3 flex items-center justify-between shadow-md z-20 shrink-0">
           <div className="flex items-center gap-2 text-white">
              <ChevronLeft size={24} className="cursor-pointer"/>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                 <User className="text-slate-400 p-1" />
              </div>
              <div className="flex flex-col">
                 <span className="font-bold text-sm leading-none">Juan Pérez</span>
                 <span className="text-[10px] text-white/80 mt-0.5">En línea</span>
              </div>
           </div>
           <div className="flex gap-4 text-white">
              <Video size={20} />
              <Phone size={18} />
              <MoreVertical size={18} />
           </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 p-4 relative flex flex-col gap-3 overflow-hidden bg-[#E5DDD5]">
           <div className="absolute inset-0 opacity-[0.06] bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png')] bg-repeat bg-[length:150px_150px] mix-blend-multiply pointer-events-none"></div>

           <div className="flex flex-col justify-end min-h-full pb-2">
             <AnimatePresence mode="popLayout">
               {visibleMessages.map((msgId) => {
                  const isHistory = msgId === 0;
                  const msg: any = isHistory ? STATIC_HISTORY : CHAT_SEQUENCE.find(m => m.id === msgId);
                  if (!msg) return null;

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: 20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      layout 
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                      className={`relative z-10 max-w-[90%] mb-2 ${isHistory ? 'self-center mb-6' : 'self-end'}`}
                    >
                       {isHistory ? (
                           <div className="bg-[#FFF5C4] px-3 py-1.5 rounded-lg shadow-sm border border-[#F0E6B6] text-center">
                               <p className="text-[10px] text-slate-600 font-medium">{msg.text}</p>
                           </div>
                       ) : (
                           <div className="bg-[#d9fdd3] p-2.5 rounded-lg rounded-tr-none text-slate-800 shadow-sm relative">
                              <div className="absolute -top-0 -right-2 w-0 h-0 border-[8px] border-transparent border-t-[#d9fdd3] transform"></div>
                              <p className="text-xs leading-snug">{msg.text}</p>
                              <div className="mt-1.5 py-1.5 px-2 bg-white/60 rounded-md flex items-center gap-2 cursor-pointer border border-black/5 hover:bg-white/80 transition-colors">
                                 <div className="bg-[#008069] p-1 rounded-full text-white">
                                    {msg.type === 'ticket' && <Receipt size={12} />}
                                    {msg.type === 'ready' && <CheckCircle2 size={12} />}
                                    {msg.type === 'delivery' && <Truck size={12} />}
                                 </div>
                                 <p className="text-[10px] font-bold text-[#008069] truncate">{msg.subtext}</p>
                              </div>
                              <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
                                 <p className="text-[9px]">{msg.time}</p>
                                 <CheckCircle2 size={12} className="text-[#53bdeb]"/>
                              </div>
                           </div>
                       )}
                    </motion.div>
                  );
               })}
             </AnimatePresence>
           </div>
        </div>
      </div>

      {/* BURBUJAS FLOTANTES */}
      <AnimatePresence>
         {visibleMessages.map((msgId) => {
            if(msgId === 0) return null; 
            const msg: any = CHAT_SEQUENCE.find(m => m.id === msgId);
            if (!msg) return null;

            return (
                <motion.div
                    key={`float-${msg.id}`}
                    initial={{ opacity: 0, scale: 0.8, x: msgId % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
                    className={`absolute ${msg.floating.pos} ${msg.floating.rot} z-10 hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl w-56 pointer-events-none`}
                >
                    <div className={`w-10 h-10 rounded-full ${msg.floating.color} flex items-center justify-center shrink-0 shadow-lg shadow-black/20`}>
                        <msg.floating.icon className="text-white w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] text-blue-200/80 font-bold uppercase tracking-wider">
                            {msg.floating.label}
                        </p>
                        <p className="text-xs text-white font-bold leading-tight">
                            {msg.floating.value}
                        </p>
                    </div>
                </motion.div>
            );
         })}
      </AnimatePresence>

      {/* BARRA DE ACCIONES */}
      <div className="absolute -bottom-6 w-[280px] bg-white/10 backdrop-blur-xl rounded-2xl p-1.5 z-30 border border-white/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex gap-2">
         {CHAT_SEQUENCE.map((scenario) => {
            const isActive = visibleMessages.includes(scenario.id) && currentStep === scenario.id;
            return (
               <div key={scenario.id} className="flex-1 relative">
                  <motion.div 
                     animate={{ 
                        backgroundColor: isActive ? "#ffffff" : "rgba(255,255,255,0.05)",
                        scale: isActive ? 1.05 : 1
                     }}
                     className="h-10 rounded-xl flex items-center justify-center gap-2 transition-all cursor-default"
                  >
                     {isActive ? <Send size={14} className="text-[#008069] animate-pulse"/> : <Send size={14} className="text-white/30"/>}
                     <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? 'text-[#008069]' : 'text-white/30'}`}>
                        {isActive ? "Enviando..." : scenario.action}
                     </span>
                  </motion.div>
               </div>
            )
         })}
      </div>

    </div>
  );
};