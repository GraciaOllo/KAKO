import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { mockProducts } from "../data/mockProducts";

const conditions = ["Tous", "Comme neuf", "Bon état", "Satisfaisant"];

function CatalogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [condition, setCondition] = useState("Tous");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("recent");

  const categories = ["Toutes", ...new Set(mockProducts.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    const result = mockProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const matchesCategory =
        category === "Toutes" || product.category === category;
      const matchesCondition =
        condition === "Tous" || product.condition === condition;
      const matchesPrice = product.price >= min && product.price <= max;
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    });

    if (sort === "prix-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "prix-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "recent") result.sort((a, b) => b.id - a.id);

    return result;
  }, [search, category, condition, minPrice, maxPrice, sort]);

  const hasActiveFilters =
    search !== "" ||
    category !== "Toutes" ||
    condition !== "Tous" ||
    minPrice !== "" ||
    maxPrice !== "";

  function resetFilters() {
    setSearch("");
    setCategory("Toutes");
    setCondition("Tous");
    setMinPrice("");
    setMaxPrice("");
    setSort("recent");
  }

  const selectClass =
    "rounded-full border border-space-cadet/15 bg-white px-4 py-2 text-sm";
  const priceInputClass =
    "w-28 rounded-full border border-space-cadet/15 px-4 py-2 text-sm outline-none focus:border-space-cadet";

  return (
    <div className="w-full self-start">
      <h1 className="mb-6 text-3xl font-bold text-space-cadet">Catalogue</h1>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-space-cadet/10 bg-white p-4 shadow-sm">
        <div className="relative">
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

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filtrer par catégorie"
            className={selectClass}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            aria-label="Filtrer par état"
            className={selectClass}
          >
            {conditions.map((cond) => (
              <option key={cond} value={cond}>
                {cond === "Tous" ? "Tous les états" : cond}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Prix min"
            aria-label="Prix minimum"
            className={priceInputClass}
          />
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Prix max"
            aria-label="Prix maximum"
            className={priceInputClass}
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Trier les articles"
            className={selectClass}
          >
            <option value="recent">Plus récents</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 rounded-full bg-gargoyle-gas px-4 py-2 text-sm font-medium text-space-cadet"
            >
              <X size={14} aria-hidden="true" />
              Réinitialiser
            </button>
          )}
        </div>
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