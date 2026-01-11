// Archivo: src/app/dashboard/plant/types.ts

export type ColumnStatus = 'PENDING' | 'IN_PROCESS' | 'READY';
export type ProcessStep = 'WAITING' | 'WASHING' | 'DRYING' | 'FINISHING' | 'COMPLETED';
export type TabView = 'TAB_PENDING' | 'TAB_PROCESS' | 'TAB_READY';

export interface OrderItem {
    name: string;
    qty: number;
    category: string;
}

export interface Order {
  id: string;
  bagId: string;
  clientName: string;
  items: OrderItem[];
  weight: number;
  status: ColumnStatus;
  step: ProcessStep;
  startTime: Date;
  isPriority?: boolean;
  type: 'ROPA' | 'ZAPATILLAS' | 'CAMA' | 'MIXTO';
  photos?: Record<string, string>; // { 'nombre_item': 'base64...' }
}