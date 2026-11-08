import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/mockProducts";

function HomePage() {
  return (
    <div className="w-full space-y-12">
      <section className="w-full rounded-3xl border border-space-cadet/10 bg-white px-6 py-12 text-center shadow-sm sm:px-12 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-space-cadet sm:text-5xl">
          Bienvenue sur KAKO
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-space-cadet/70 sm:text-lg">
          Achetez et vendez des articles de seconde main entre particuliers.
        </p>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-space-cadet">
          Articles récents
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;