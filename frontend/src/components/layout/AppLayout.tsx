import { ShoppingBag } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-alice-blue">
      <header className="border-b border-space-cadet/10 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-space-cadet"
            aria-label="KAKO, accueil"
          >
            <ShoppingBag size={22} aria-hidden="true" />
            KAKO
          </NavLink>
          <nav aria-label="Navigation principale">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gargoyle-gas text-space-cadet"
                    : "text-space-cadet/75 hover:bg-alice-blue"
                }`
              }
            >
              Accueil
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-5 py-16 sm:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-space-cadet/10 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-5 text-sm text-space-cadet/60 sm:px-8">
          KAKO · Projet universitaire
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
