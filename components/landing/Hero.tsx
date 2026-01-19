"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, MessageCircle, TrendingUp, UserPlus, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// --- IMPORTAMOS TUS PANTALLAS ---
import { ScreenOrders } from "./screens/screen-orders";
import { ScreenFinance } from "./screens/screen-finance";
import { ScreenPOS } from "./screens/screen-clients"; 

// --- ANIMACIONES ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.3 }
  }
};

const slideInBubble: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: 20 },
  visible: { 
    opacity: 1, scale: 1, x: 0, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navegación
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + 3) % 3);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % 3);

  const phones = [
    { id: 0, component: <ScreenFinance />, label: "Finanzas" },
    { id: 1, component: <ScreenOrders isActive={activeIndex === 1} />, label: "Pedidos" },
    { id: 2, component: <ScreenPOS />, label: "POS" }
  ];

  const getPosition = (index: number) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex - 1 + 3) % 3) return "left";
    return "right";
  };

  // --- VARIANTES DE ANIMACIÓN ---
  const variants = {
    center: { x: 0, scale: 1, zIndex: 30, opacity: 1, filter: "blur(0px)", rotate: 0, y: 0 },
    left: { x: -340, scale: 0.8, zIndex: 10, opacity: 0.6, filter: "blur(2px)", rotate: -15, y: 0 },
    right: { x: 340, scale: 0.8, zIndex: 10, opacity: 0.6, filter: "blur(2px)", rotate: 15, y: 0 }
  };
  
  const mobileVariants = {
    center: { 
      x: 0, 
      scale: 1, 
      zIndex: 30, 
      opacity: 1, // Full color
      rotate: 0, 
      y: 0 
    },
    left: { 
      x: -120, // Se asoma por la izquierda
      scale: 0.85, 
      zIndex: 10, 
      opacity: 0.5, // Semi-transparente
      rotate: -10, 
      y: 0 
    },
    right: { 
      x: 120, // Se asoma por la derecha
      scale: 0.85, 
      zIndex: 10, 
      opacity: 0.5, // Semi-transparente
      rotate: 10, 
      y: 0 
    }
  };

  const getInitialState = (id: number) => {
    if (isMobile) return { opacity: 0, y: 100 };
    if (id === 1) return { y: 500, opacity: 0 };
    if (id === 0) return { x: -600, opacity: 0, rotate: -45 };
    if (id === 2) return { x: 600, opacity: 0, rotate: 45 };
    return {};
  };

  return (
    <section className="relative w-full min-h-screen pt-32 pb-20 lg:pt-48 lg:pb-0 px-4 overflow-hidden bg-[#010E9B]">
      
      {/* 1. FONDO */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
        <BackgroundRippleEffect 
           cols={50} rows={25} cellSize={50}
        />
      </div>
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[150px] z-0 opacity-20 pointer-events-none" 
      />

      {/* 2. CONTENIDO TEXTO */}
      <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="relative z-20 w-full mb-12 pointer-events-none"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-8 pointer-events-auto">
             <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              Mobile First Technology
            </span>
          </motion.div>

          {/* TÍTULO + BURBUJAS */}
          <div className="relative inline-block">
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-2xl relative z-10 mx-8">
              Tu negocio en <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-blue-200">
                piloto automático
              </span>
            </motion.h1>

            {/* Burbujas */}
            <motion.div variants={slideInBubble} className="absolute -left-72 -top-10 hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl rotate-[-8deg] w-60 pointer-events-none z-0">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-500/30"><MessageCircle fill="white" className="text-white w-5 h-5" /></div>
              <div className="text-left"><p className="text-[10px] text-white/60 font-medium uppercase">Notificación</p><p className="text-xs text-white font-bold leading-tight">"Su ropa está lista 👔"</p></div>
            </motion.div>

            <motion.div variants={slideInBubble} className="absolute -right-72 bottom-0 hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl rotate-[8deg] w-56 pointer-events-none z-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30"><TrendingUp className="text-white w-5 h-5" /></div>
              <div className="text-left"><p className="text-[10px] text-white/60 font-medium uppercase">Ingresos Hoy</p><p className="text-xl text-white font-black">S/ 1,450.00</p></div>
            </motion.div>

             <motion.div variants={slideInBubble} className="absolute -right-64 -top-16 hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl rotate-[5deg] w-60 pointer-events-none z-0">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30"><UserPlus className="text-white w-5 h-5" /></div>
              <div className="text-left"><p className="text-[10px] text-white/60 font-medium uppercase">Nuevo Cliente</p><p className="text-xs text-white font-bold leading-tight">Hotel "Los Andes" registrado.</p></div>
            </motion.div>

             <motion.div variants={slideInBubble} className="absolute -left-64 -bottom-12 hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 pr-6 rounded-2xl shadow-2xl rotate-[-5deg] w-60 pointer-events-none z-0">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/30"><AlertTriangle className="text-white w-5 h-5" /></div>
              <div className="text-left"><p className="text-[10px] text-white/60 font-medium uppercase">Alerta de Stock</p><p className="text-xs text-white font-bold leading-tight">Queda poco detergente líquido.</p></div>
            </motion.div>
          </div>

          <motion.p variants={fadeInUp} className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-8 font-medium mt-8">
            Toca los teléfonos o usa las flechas para ver más.
          </motion.p>

           {/* Botones */}
           <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto relative z-30">
            <Link href="/register">
              <motion.button className="px-8 py-4 bg-white text-[#010E9B] rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] flex items-center gap-2 active:scale-95">
                Empezar Ahora <ArrowRight size={20} className="text-[#010E9B]"/>
              </motion.button>
            </Link>
            <a href="#demo">
              <motion.button className="px-8 py-4 bg-white/5 text-white border border-white/20 rounded-2xl font-bold text-lg transition-colors flex items-center gap-2 backdrop-blur-sm hover:bg-white/10">
                <Smartphone size={20} className="text-cyan-300"/> Ver App
              </motion.button>
            </a>
          </motion.div>
        </motion.div>


        {/* --- 3. CARRUSEL DE CELULARES --- */}
        <div className="relative w-full h-[700px] flex justify-center items-center perspective-1000 mt-8 group">
            
            {/* --- FLECHAS DE NAVEGACIÓN (Solo Móvil: lg:hidden) --- */}
            <button 
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#010E9B] transition-all shadow-xl active:scale-90 lg:hidden"
            >
                <ChevronLeft size={28} />
            </button>

            <button 
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#010E9B] transition-all shadow-xl active:scale-90 lg:hidden"
            >
                <ChevronRight size={28} />
            </button>

            {phones.map((phone, index) => {
                const position = getPosition(index);
                const isCenter = position === "center";

                return (
                    <motion.div
                        key={phone.id}
                        initial={getInitialState(phone.id)} 
                        animate={position}
                        variants={isMobile ? mobileVariants : variants}
                        transition={{ 
                           default: { type: "spring", stiffness: 300, damping: 30 },
                           y: { duration: 1.5, ease: "easeOut", delay: 0.8 + (index * 0.2) },
                           x: { duration: 1.5, ease: "easeOut", delay: 0.8 + (index * 0.2) },
                           opacity: { duration: 1.2, delay: 0.8 + (index * 0.2) },
                           rotate: { duration: 1.5, ease: "easeOut", delay: 0.8 + (index * 0.2) }
                        }}
                        onClick={() => setActiveIndex(index)}
                        className={`absolute w-[320px] h-[650px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden cursor-pointer ${isCenter ? 'cursor-default z-30 shadow-[0_0_80px_-20px_rgba(1,14,155,0.6)]' : 'cursor-pointer hover:border-slate-700 z-10'}`}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-xl z-40 pointer-events-none"/>
                        
                        {/* Brillo oscuro solo en inactivos */}
                        {!isCenter && (<div className="absolute inset-0 bg-black/40 z-50 pointer-events-none transition-colors hover:bg-black/10"/>)}
                        
                        <div className="w-full h-full bg-slate-50 pointer-events-auto">
                           {phone.component}
                        </div>

                        {!isCenter && (<div className="absolute bottom-10 left-0 right-0 text-center z-50 pointer-events-none"><span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">{phone.label}</span></div>)}
                    </motion.div>
                );
            })}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#010E9B] via-[#010E9B]/20 to-transparent z-20 pointer-events-none" />
    </section>
  );
}