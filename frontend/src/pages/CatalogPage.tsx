import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/mockProducts";

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [sort, setSort] = useState("recent");

  const categories = ["Toutes", ...new Set(mockProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    const result = mockProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesCategory = category === "Toutes" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === "prix-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "recent") result.sort((a, b) => b.id - a.id);

    return result;
  }, [search, category, sort]);

  return (
    <div className="w-full self-start">
      <h1 className="mb-6 text-3xl font-bold text-space-cadet">Catalogue</h1>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-space-cadet/10 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-space-cadet/50"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full rounded-full border border-space-cadet/15 py-2 pl-10 pr-4 text-sm outline-none focus:border-space-cadet"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filtrer par catégorie"
          className="rounded-full border border-space-cadet/15 bg-white px-4 py-2 text-sm"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Trier les articles"
          className="rounded-full border border-space-cadet/15 bg-white px-4 py-2 text-sm"
        >
          <option value="recent">Plus récents</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-space-cadet/60">
        {filteredProducts.length} article(s) trouvé(s)
      </p>

      {filteredProducts.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-space-cadet/70">
          Aucun article ne correspond à votre recherche.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CatalogPage;