import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../../services/api/products";
import type { Product } from "../../types/product";
import {
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  TrendingUp,
} from "lucide-react";

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .getMine()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: products.length,
    online: products.filter((p) => p.status === "approuve").length,
    moderation: products.filter((p) => p.status === "en_moderation").length,
    rejected: products.filter((p) => p.status === "rejete").length,
  };

  const cards = [
    {
      label: "Total articles",
      value: stats.total,
      icon: Package,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "En ligne",
      value: stats.online,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "En modération",
      value: stats.moderation,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Rejetés",
      value: stats.rejected,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  if (loading) {
    return (
      <p className="p-8 text-space-cadet/60">Chargement du tableau de bord...</p>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-space-cadet">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-space-cadet/60">
            Vue d'ensemble de votre activité vendeur
          </p>
        </div>
        <Link
          to="/vendeur/produits/nouveau"
          className="inline-flex items-center gap-2 rounded-xl bg-space-cadet px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={18} />
          Ajouter un article
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-space-cadet/10 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-space-cadet/60">{card.label}</p>
                <p className="mt-1 text-2xl font-bold text-space-cadet">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-xl p-3 ${card.color}`}>
                <card.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Derniers produits */}
      <div className="rounded-2xl border border-space-cadet/10 bg-white">
        <div className="flex items-center justify-between border-b border-space-cadet/10 px-6 py-4">
          <h2 className="font-semibold text-space-cadet">Derniers articles</h2>
          <Link
            to="/vendeur/produits"
            className="text-sm font-medium text-space-cadet/70 hover:text-space-cadet"
          >
            Voir tout →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="px-6 py-12 text-center text-space-cadet/50">
            Aucun produit publié pour le moment
          </div>
        ) : (
          <ul className="divide-y divide-space-cadet/5">
            {products.slice(0, 5).map((p) => (
              <li
                key={p._id}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  {p.images[0] ? (
                    <img
                      src={`http://localhost:5000${p.images[0]}`}
                      alt=""
                      className="h-11 w-11 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-alice-blue">
                      <Package size={18} className="text-space-cadet/40" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-space-cadet">{p.title}</p>
                    <p className="text-xs text-space-cadet/50">
                      {p.category} · {p.condition}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-space-cadet">
                    {p.price.toLocaleString()} FCFA
                  </p>
                  <p className="text-xs capitalize text-space-cadet/50">
                    {p.status.replace("_", " ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Astuce */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-gargoyle-gas/30 px-5 py-4">
        <TrendingUp size={20} className="mt-0.5 text-space-cadet" />
        <div>
          <p className="text-sm font-medium text-space-cadet">Conseil vendeur</p>
          <p className="mt-0.5 text-sm text-space-cadet/70">
            Ajoutez au moins 3 photos de bonne qualité et une description
            détaillée pour augmenter vos chances d’approbation et de vente.
          </p>
        </div>
      </div>
    </div>
  );
}
