import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/seller/ProductForm";
import { productApi } from "../../services/api/products";
import type { Product, ProductFormData } from "../../types/product";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    productApi
      .getById(id)
      .then(setProduct)
      .catch(() => setError("Produit introuvable"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: ProductFormData) => {
    if (!id) return;
    setSaving(true);
    setError("");
    try {
      await productApi.update(id, data);
      navigate("/vendeur/produits");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la modification");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-8 text-space-cadet/60">Chargement...</p>;
  }

  if (!product) {
    return (
      <div className="p-8">
        <p className="text-red-600">{error || "Produit introuvable"}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-space-cadet">
          Modifier l'article
        </h1>
        <p className="mt-1 text-sm text-space-cadet/60">
          Les modifications importantes remettent l'annonce en modération.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-space-cadet/10 bg-white p-6 sm:p-8">
        <ProductForm
          initialData={{
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            condition: product.condition,
            stock: product.stock,
            location: product.location,
          }}
          onSubmit={handleSubmit}
          submitLabel="Enregistrer les modifications"
          loading={saving}
        />
      </div>
    </div>
  );
}
