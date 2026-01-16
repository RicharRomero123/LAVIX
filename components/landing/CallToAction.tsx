import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-24 bg-lavix-900 relative overflow-hidden text-center px-4">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          ¿Listo para digitalizar tu negocio?
        </h2>
        <p className="text-lavix-200 text-lg mb-10">
          Únete a la lista de espera y obtén 30 días gratis en el lanzamiento.
        </p>
        <Link 
          href="/register" 
          className="inline-block px-10 py-4 bg-lavix-600 text-white rounded-2xl font-bold text-lg hover:bg-lavix-500 transition-colors shadow-lg shadow-lavix-600/40"
        >
          Crear Cuenta Gratis
        </Link>
      </div>
      
      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
    </section>
  );
}