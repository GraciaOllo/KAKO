import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  LogOut,
  ShoppingBag,
} from "lucide-react";

const navItems = [
  { to: "/vendeur", label: "Tableau de bord", icon: LayoutDashboard, end: true },
  { to: "/vendeur/produits", label: "Mes produits", icon: Package },
  { to: "/vendeur/produits/nouveau", label: "Ajouter un article", icon: PlusCircle },
];

export default function SellerLayout() {
  return (
    <div className="flex min-h-screen bg-alice-blue">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-space-cadet/10 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-space-cadet/10 px-6">
          <ShoppingBag size={22} className="text-space-cadet" />
          <span className="text-lg font-bold tracking-tight text-space-cadet">
            KAKO Vendeur
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-space-cadet text-white"
                    : "text-space-cadet/70 hover:bg-alice-blue hover:text-space-cadet"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-space-cadet/10 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-space-cadet/60 hover:bg-alice-blue">
            <Settings size={18} />
            Paramètres
          </button>
          <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="ml-64 flex flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-space-cadet/10 bg-white/80 px-8 backdrop-blur">
          <h2 className="text-sm font-medium text-space-cadet/60">
            Espace vendeur
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-space-cadet">
              Asser Bounang
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-space-cadet text-sm font-semibold text-white">
              AB
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
