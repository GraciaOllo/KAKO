import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../../services/api/products";
import type { Product } from "../../types/product";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function SellerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await productApi.getMine();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    await productApi.delete(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      approuve: "bg-green-100 text-green-800",
      en_moderation: "bg-amber-100 text-amber-800",
      rejete: "bg-red-100 text-red-800",
      brouillon: "bg-gray-100 text-gray-700",
      vendu: "bg-blue-100 text-blue-800",
    };
    return map[status] || "bg-gray-100";
  };

  if (loading) return <p className="p-8">Chargement...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-space-cadet">
          Mes annonces ({products.length})
        </h1>
        <Link
          to="/vendeur/produits/nouveau"
          className="inline-flex items-center gap-2 bg-space-cadet text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          <Plus size={18} /> Ajouter un article
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border">
          <p className="text-space-cadet/60 mb-4">
            Aucun produit pour le moment
          </p>
          <Link
            to="/vendeur/produits/nouveau"
            className="text-space-cadet font-medium underline"
          >
            Publier votre premier article
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-alice-blue text-left">
              <tr>
                <th className="p-4">Produit</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.images[0] && (
                        <img
                          src={`http://localhost:5000${p.images[0]}`}
                          alt=""
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-xs text-space-cadet/50">
                          {p.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBadge(
                        p.status
                      )}`}
                    >
                      {p.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 font-medium">
                    {p.price.toLocaleString()} FCFA
                  </td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/vendeur/produits/${p._id}/modifier`}
                        className="p-2 hover:bg-alice-blue rounded-lg"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
