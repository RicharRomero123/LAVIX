import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import Features from "@/components/landing/Features"; // NUEVO
import Pricing from "@/components/landing/Pricing"; // NUEVO
import FAQ from "@/components/landing/FAQ"; // NUEVO
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-[#010E9B]">
      <Navbar />
      <Hero />
      <Benefits /> {/* "Por qué nosotros" (Resumen) */}
      <Features /> {/* "Qué hacemos" (Detalle con imágenes) */}
      <InteractiveDemo /> {/* "Cómo se ve" */}
      <Pricing />  {/* "Cuánto cuesta" */}
      <FAQ />      {/* "Dudas finales" */}
      <CallToAction />
      <Footer />
    </main>
  );
}

