"use client";
import { useState } from "react";
import { Bell, MessageCircle, Check } from "lucide-react";

export const ScreenOrders = ({ isActive }: { isActive: boolean }) => {
  const [orders, setOrders] = useState([
    { id: 1, name: "Maria L.", status: "pending", items: "3kg Ropa" },
    { id: 2, name: "Juan P.", status: "ready", items: "2 Ternos" },
  ]);

  const handleNotify = (id: number) => {
    if (!isActive) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "ready" } : o))
    );
  };

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col font-sans select-none">
      <div className="bg-[#010E9B] p-5 pt-8 flex justify-between items-center shadow-lg relative z-10">
        <p className="text-white font-bold text-sm">Pedidos</p>
        <Bell className="text-white w-4 h-4" />
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-hidden bg-slate-100 relative z-0">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-3 rounded-xl border shadow-sm transition-colors duration-300 ${
              order.status === "ready"
                ? "bg-green-50 border-green-200"
                : "bg-white"
            }`}
          >
            <div className="flex justify-between mb-1">
              <span className="font-bold text-slate-700 text-xs">
                {order.name}
              </span>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                  order.status === "ready"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status === "ready" ? "LISTO" : "PEND"}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mb-2">{order.items}</p>
            {order.status === "pending" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNotify(order.id);
                }}
                className="w-full bg-[#010E9B] text-white text-[10px] font-bold py-2 rounded flex items-center justify-center gap-1 active:scale-95 transition-transform hover:bg-blue-900"
              >
                <MessageCircle size={12} /> WhatsApp
              </button>
            ) : (
              <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold animate-pulse">
                <Check size={12} /> Enviado
              </div>
            )}
          </div>
        ))}
        {/* Fake item */}
        <div className="h-20 bg-white rounded-xl border border-slate-200 opacity-50" />
      </div>
    </div>
  );
};