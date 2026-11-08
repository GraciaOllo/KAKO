import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("fr-FR").format(product.price);

  return (
    <Link
      to={`/produits/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-space-cadet/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-alice-blue">
        <img
          src={product.imageUrl}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-gargoyle-gas px-3 py-1 text-xs font-medium text-space-cadet">
          {product.category}
        </span>
        <h3 className="text-base font-semibold text-space-cadet">
          {product.title}
        </h3>
        <p className="text-sm text-space-cadet/60">{product.condition}</p>
        <p className="mt-auto text-lg font-bold text-space-cadet">
          {formattedPrice} FCFA
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;