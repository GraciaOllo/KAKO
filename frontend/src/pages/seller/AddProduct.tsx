import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/seller/ProductForm";
import { productApi } from "../../services/api/products";
import type { ProductFormData } from "../../types/product";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: ProductFormData) => {
    setLoading(true);
    setError("");
    try {
      await productApi.create(data);
      navigate("/vendeur/produits");
    } catch (err: any) {
      setError(err.message || "Erreur lors de la publication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-space-cadet">
          Publier un nouvel article
        </h1>
        <p className="mt-1 text-sm text-space-cadet/60">
          Remplissez les informations. Votre annonce passera en modération.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-space-cadet/10 bg-white p-6 sm:p-8">
        <ProductForm
          onSubmit={handleSubmit}
          submitLabel="Publier l'article"
          loading={loading}
        />
      </div>
    </div>
  );
}
