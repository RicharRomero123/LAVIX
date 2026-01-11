// Archivo: src/app/dashboard/reception/data.ts

export const PRICE_PER_KILO = 4.00;

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const PRODUCTS: Product[] = [
  // ZAPATILLAS
  { id: '68', name: 'Zapatillas', price: 20.00, category: 'ZAPATILLAS' },
  { id: '69', name: 'Zapatillas Niños', price: 15.00, category: 'ZAPATILLAS' },
  { id: '52', name: 'Sandalias', price: 15.00, category: 'ZAPATILLAS' },

  // TERNOS
  { id: '61', name: 'Terno Completo', price: 20.00, category: 'TERNOS' },
  { id: '50', name: 'Saco', price: 12.00, category: 'TERNOS' },
  { id: '51', name: 'Sacos x Mayor', price: 7.00, category: 'TERNOS' },

  // VESTIDOS
  { id: '63', name: 'Vestido Novia + Velo', price: 80.00, category: 'VESTIDOS' },
  { id: '67', name: 'Vestido Largo', price: 20.00, category: 'VESTIDOS' },
  { id: '66', name: 'Vestido Corto', price: 15.00, category: 'VESTIDOS' },

  // TEÑIDOS
  { id: '59', name: 'Teñido Short', price: 12.00, category: 'TEÑIDOS' },
  { id: '57', name: 'Teñido Pantalón', price: 15.00, category: 'TEÑIDOS' },

  // HOGAR
  { id: '62', name: 'Toalla (Paño)', price: 3.00, category: 'HOGAR' },
  { id: '54', name: 'Tapete Grande', price: 10.00, category: 'HOGAR' },
];