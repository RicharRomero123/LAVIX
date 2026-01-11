import MobileNav from "@/components/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-gray-50 pb-20">
      {/* pb-20 (Padding Bottom 20) es CRÍTICO. 
        Deja espacio para que la barra de navegación no tape el contenido final.
      */}
      
      {/* Aquí se renderizará la página específica (Recepción, Planta, etc.) */}
      <div className="max-w-4xl mx-auto">
        {children}
      </div>

      {/* Barra de Navegación Persistente */}
      <MobileNav />
    </section>
  );
}