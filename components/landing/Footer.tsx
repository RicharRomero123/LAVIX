"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Footer() {
  
  // Lista de Links
  const links = {
    producto: [
      { name: "Características", href: "#features" },
      { name: "Precios", href: "#precios" },
      { name: "Hardware", href: "#ecosistema" },
      { name: "Changelog", href: "/changelog" },
    ],
    legal: [
      { name: "Términos y Condiciones", href: "/terms" },
      { name: "Política de Privacidad", href: "/privacy" },
      { name: "Libro de Reclamaciones", href: "/reclamaciones" },
    ],
    contacto: [
      { name: "Soporte WhatsApp", href: "https://wa.me/..." },
      { name: "ventas@lavix.com", href: "mailto:ventas@lavix.com" },
      { name: "Lima, Perú", href: "#" },
    ]
  };

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-white/10 relative overflow-hidden">
      
      {/* Luz ambiental inferior */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        {/* --- GRID SUPERIOR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          
          {/* COLUMNA 1: MARCA */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-black text-white mb-4 block tracking-tighter">
              LAVIX
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-slate-500">
              El sistema operativo para lavanderías modernas. Automatiza, controla y crece sin límites.
            </p>
            {/* Newsletter Mini */}
            <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-xl border border-white/10 max-w-[240px]">
                <input 
                    type="email" 
                    placeholder="Tu correo..." 
                    className="bg-transparent border-none text-xs text-white px-2 focus:ring-0 w-full outline-none placeholder:text-slate-600"
                />
                <button className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-500 transition-colors">
                    <Send size={14} />
                </button>
            </div>
          </div>

          {/* COLUMNA 2: PRODUCTO */}
          <div>
            <h4 className="text-white font-bold mb-6">Producto</h4>
            <ul className="space-y-4 text-sm">
              {links.producto.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: LEGAL */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div>
            <h4 className="text-white font-bold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              {links.contacto.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- SEPARADOR --- */}
        <div className="h-px w-full bg-white/10 mb-8"></div>

        {/* --- GRID INFERIOR (COPYRIGHT + SOCIALS) --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium">
          
          {/* Copyright */}
          <p className="text-slate-500 text-center md:text-left">
            © 2026 LAVIX Technologies S.A.C. <br className="md:hidden"/> Todos los derechos reservados.
          </p>

          {/* Social Media Icons (SVG Custom) */}
          <div className="flex items-center gap-4">
            
            {/* Facebook */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.651-2.797 2.895v1.076h3.44l-.571 3.667h-2.869v7.98h-5.018z"/></svg>
            </a>

            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 group">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>

            {/* TikTok */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            
            {/* LinkedIn */}
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300 group">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h5v-8.321c0-4.62 5.393-5.238 5.393-.588v8.909h5v-9.683c0-7.818-8.7-7.75-10.425-3.563v-2.755z"/></svg>
            </a>

          </div>

          {/* Made in Peru */}
          <div className="flex items-center gap-1.5 opacity-80">
            <span className="text-slate-500">Hecho con</span>
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-blue-500"
            >
              💙
            </motion.span>
            <span className="text-slate-500">en Perú</span>
          </div>

        </div>
      </div>
    </footer>
  );
}