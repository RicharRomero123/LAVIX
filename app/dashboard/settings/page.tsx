"use client";

import Link from "next/link";
import { 
  Users,          // Para Personal
  Tags,           // Para Precios/Servicios
  Map,            // Para Zonas de Reparto
  Store,          // Para Datos de Empresa
  ShieldCheck,    // Para Seguridad
  ChevronRight,   // Flechita
  LogOut,         // Cerrar Sesión
  Printer,        // Para Impresoras/Tickets
  HelpCircle      // Soporte
} from "lucide-react";

export default function SettingsPage() {
  
  // Lista de Opciones de Configuración
  const settingsOptions = [
    {
      category: "Operativo",
      items: [
        {
          title: "Gestión de Personal",
          desc: "Administrar cajeros, operarios y motorizados.",
          icon: Users,
          href: "/dashboard/settings/team", 
          color: "text-blue-600 bg-blue-50"
        },
        {
          title: "Tarifario y Servicios",
          desc: "Editar precios, crear ofertas y nuevos servicios.",
          icon: Tags,
          href: "/dashboard/settings/services", 
          color: "text-green-600 bg-green-50"
        },
        {
          title: "Zonas de Delivery",
          desc: "Configurar distritos, costos y cobertura.",
          icon: Map,
          href: "/dashboard/settings/delivery-zones", 
          color: "text-purple-600 bg-purple-50"
        }
      ]
    },
    {
      category: "Sistema",
      items: [
        {
          title: "Datos de Empresa",
          desc: "Logo, RUC, Dirección y Mensaje de Ticket.",
          icon: Store,
          href: "/dashboard/settings/company", 
          color: "text-orange-600 bg-orange-50"
        },
        {
          title: "Impresoras y Tickets",
          desc: "Configurar tamaño de papel y conexión.",
          icon: Printer,
          href: "/dashboard/settings/printers", 
          color: "text-gray-600 bg-gray-100"
        }
      ]
    },
    {
      category: "Seguridad",
      items: [
        {
          title: "Cuenta y Seguridad",
          desc: "Contraseñas y permisos de acceso.",
          icon: ShieldCheck,
          href: "/dashboard/settings/security", 
          color: "text-red-600 bg-red-50"
        }
      ]
    }
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen pb-24">
      
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configuración ⚙️</h1>
        <p className="text-sm text-gray-500">Administra tu negocio desde aquí.</p>
      </div>

      {/* LISTA DE OPCIONES */}
      <div className="space-y-6">
        {settingsOptions.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-3 ml-1 tracking-wider">
              {section.category}
            </h3>
            
            <div className="space-y-3">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <Link key={itemIdx} href={item.href} className="block group">
                    <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group-hover:border-blue-200 transition-all active:scale-[0.98]">
                      
                      <div className="flex items-center gap-4">
                        {/* Icono con fondo de color */}
                        <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                          <Icon size={24} strokeWidth={2} />
                        </div>
                        
                        {/* Textos */}
                        <div className="text-left">
                          <h3 className="font-bold text-gray-800 text-sm md:text-base">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-400 leading-tight mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-500 transition-colors"/>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER / LOGOUT */}
      <div className="mt-8 space-y-4">
        <button 
            onClick={() => alert("Cerrando sesión...")}
            className="w-full flex items-center justify-center gap-2 text-red-600 font-bold p-4 bg-white border border-red-100 rounded-xl hover:bg-red-50 active:scale-[0.98] transition-all shadow-sm"
        >
          <LogOut size={20} />
          Cerrar Sesión
        </button>
        
        <div className="text-center">
            <button className="text-xs text-blue-500 font-medium flex items-center justify-center gap-1 mx-auto hover:underline">
                <HelpCircle size={12}/> ¿Necesitas ayuda o soporte?
            </button>
            <p className="text-[10px] text-gray-300 mt-2">Lava-OS v1.0.0 • Lima, Perú 🇵🇪</p>
        </div>
      </div>

    </div>
  );
}