import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";

function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="w-full self-start rounded-2xl bg-white p-8 text-center">
        <p className="mb-4 text-space-cadet/70">Cet article est introuvable.</p>
        <Link to="/catalogue" className="font-semibold text-space-cadet underline">
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price);

  return (
    <div className="w-full self-start">
      <Link
        to="/catalogue"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-space-cadet/70 hover:text-space-cadet"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Retour au catalogue
      </Link>

      <div className="grid gap-8 rounded-3xl border border-space-cadet/10 bg-white p-6 shadow-sm md:grid-cols-2">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full rounded-2xl object-cover"
        />
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-gargoyle-gas px-3 py-1 text-xs font-medium">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-space-cadet">{product.title}</h1>
          <p className="text-2xl font-bold text-space-cadet">{formattedPrice} FCFA</p>
          <p className="text-space-cadet/70">État : {product.condition}</p>
          <button
            type="button"
            className="mt-4 w-fit rounded-full bg-space-cadet px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;