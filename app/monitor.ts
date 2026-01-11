// src/types/monitor.ts

export type OrderStatus = 'PENDIENTE' | 'EN_PROCESO' | 'TERMINADO' | 'EN_RUTA' | 'ENTREGADO' | 'CANCELADO';
export type ServicePriority = 'NORMAL' | 'EXPRESS' | 'SUPER_EXPRESS';
export type PaymentMethod = 'EFECTIVO' | 'YAPE' | 'PLIN' | 'TARJETA' | 'TRANSFERENCIA' | null;

export interface Prenda {
  id: string;
  cant: number;
  item: string;
  servicio: string;
  precio_unitario: number;
  subtotal: number;
  descripcion?: string; // Ej: "Marca Zara, botón roto"
}

export interface Finanzas {
  subtotal_servicios: number;
  costo_delivery: number;
  descuento: number;
  total_final: number; // (subtotal + delivery) - descuento
  acuenta: number;     // Lo que pagó al inicio
  saldo_pendiente: number;
  es_pagado: boolean;
  metodo_pago_inicial?: PaymentMethod;
}

export interface Logistica {
  tipo_entrega: 'TIENDA' | 'DELIVERY';
  distrito: string | null;
  direccion: string | null;
  referencia: string | null;
  google_maps_link: string | null;
  motorizado_nombre?: string | null;
  motorizado_id?: string;
}

export interface Fechas {
  ingreso: string;
  salida_prog: string;
  entrega_real?: string;
}

// --- INTERFAZ PRINCIPAL ACTUALIZADA ---
export interface Order {
  id: string;
  
  // AHORA ES UN OBJETO, NO UN STRING
  cliente: {
    nombre: string;
    celular: string;
    dni_ruc?: string; // Para facturación
  };

  estado: OrderStatus;
  prioridad: ServicePriority; // Para marcar en rojo los urgentes

  // DATOS AGRUPADOS
  logistica: Logistica;
  finanzas: Finanzas;
  fechas: Fechas;
  
  detalle_prendas: Prenda[];
  observaciones: string | null;
  fotos_ingreso?: string[];
}