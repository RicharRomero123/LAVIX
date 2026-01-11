"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  PlusCircle,       // Recepción (Hacer pedidos)
  WashingMachine,   // Planta (Operario)
  LayoutDashboard,  // Monitor (Logística/Delivery)
  BarChart3         // Gerencia (Stats + Acceso a Config)
} from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Recepción", href: "/dashboard/reception", icon: PlusCircle },
    { name: "Planta", href: "/dashboard/plant", icon: WashingMachine },
    { name: "Monitor", href: "/dashboard/monitor", icon: LayoutDashboard },
    { name: "Gerencia", href: "/dashboard/admin", icon: BarChart3 }, 
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all
                ${isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Icon size={isActive ? 26 : 22} strokeWidth={isActive ? 2.5 : 2} className="mb-0.5"/>
              <span className={`text-[9px] font-bold ${isActive ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}