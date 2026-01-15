import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-lavix-100 selection:text-lavix-900">
      <Navbar />
      <Hero />
      <Benefits />
      <InteractiveDemo />
      <CallToAction />
      <Footer />
    </main>
  );
}