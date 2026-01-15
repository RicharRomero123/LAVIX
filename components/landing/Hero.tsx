"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const container: Variants = {
    visible: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 relative overflow-hidden">
      {/* Background Blobs Animados */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-lavix-100 rounded-full blur-[120px] -z-10 opacity-60" 
      />
      <motion.div 
         animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
         transition={{ duration: 15, repeat: Infinity }}
         className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px] -z-10 opacity-60" 
      />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span className="px-4 py-1.5 rounded-full bg-lavix-50 border border-lavix-100 text-lavix-600 text-xs font-black uppercase tracking-widest">
              🚀 Tecnología para Lavanderías 2026
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Tu negocio en <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavix-600 to-cyan-500">
              piloto automático
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p variants={fadeInUp} className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium">
            Elimina el robo hormiga, digitaliza tu planta y fideliza clientes con el software diseñado para dueños, no para informáticos.
          </motion.p>

          {/* Botones */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/register">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-lavix-900 text-white rounded-2xl font-bold text-lg hover:bg-lavix-700 transition-colors shadow-xl shadow-lavix-900/20 flex items-center gap-2"
              >
                Empezar Ahora <ArrowRight size={20} />
              </motion.button>
            </Link>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <PlayCircle size={20} className="text-slate-400"/> Ver Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}