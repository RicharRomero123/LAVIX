import { Package, Timer, CheckCircle2, Bike, CheckCheck } from "lucide-react";
import { OrderStatus } from "@/app/monitor";

export const StatusBadge = ({ estado }: { estado: OrderStatus }) => {
  switch (estado) {
    case 'PENDIENTE': 
      return <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-bold border border-gray-200 flex items-center gap-1"><Package size={10}/> PENDIENTE</span>;
    case 'EN_PROCESO': 
      return <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold border border-blue-200 flex items-center gap-1"><Timer size={10}/> LAVANDO</span>;
    case 'TERMINADO': 
      return <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200 flex items-center gap-1"><CheckCircle2 size={10}/> LISTO</span>;
    case 'EN_RUTA': // <--- NUEVO ESTADO
      return <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold border border-purple-200 flex items-center gap-1"><Bike size={10}/> EN CAMINO</span>;
    case 'ENTREGADO': 
      return <span className="text-[10px] bg-gray-800 text-white px-2 py-0.5 rounded-full font-bold flex items-center gap-1"><CheckCheck size={10}/> FINALIZADO</span>;
    default: return null;
  }
};