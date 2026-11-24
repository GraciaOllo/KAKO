import { useState, type FormEvent, type ChangeEvent } from "react";
import type { ProductFormData, ProductCondition } from "../../types/product";
import { Upload, X } from "lucide-react";

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

const CATEGORIES = [
  "Électronique",
  "Mode",
  "Maison",
  "Sport",
  "Véhicules",
  "Autres",
];

const CONDITIONS: ProductCondition[] = [
  "Neuf",
  "Comme neuf",
  "Bon état",
  "Correct",
];

export default function ProductForm({
  initialData,
  onSubmit,
  submitLabel = "Publier l'article",
  loading = false,
}: ProductFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category: initialData?.category || "Électronique",
    condition: (initialData?.condition as ProductCondition) || "Bon état",
    stock: initialData?.stock || 1,
    location: initialData?.location || "Yaoundé",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (files.length + selected.length > 5) {
      alert("Maximum 5 images");
      return;
    }
    setFiles((prev) => [...prev, ...selected]);
    selected.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dataTransfer = new DataTransfer();
    files.forEach((f) => dataTransfer.items.add(f));

    await onSubmit({
      ...form,
      images: dataTransfer.files,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Images */}
      <div>
        <label className="mb-2 block text-sm font-medium text-space-cadet">
          Photos (max 5)
        </label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl border"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {files.length < 5 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-space-cadet/20 text-space-cadet/50 transition hover:border-space-cadet/40 hover:bg-alice-blue">
              <Upload size={24} />
              <span className="text-xs">Ajouter</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
            </label>
          )}
        </div>
      </div>

      {/* Titre */}
      <div>
        <label className="mb-1.5 block text-sm font-medium">Titre *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          maxLength={120}
          placeholder="Ex: Casque Bluetooth Pro"
          className="w-full rounded-xl border border-space-cadet/15 px-4 py-2.5 outline-none focus:border-space-cadet focus:ring-1 focus:ring-space-cadet"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-1.5 block text-sm font-medium">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          maxLength={2000}
          placeholder="Décrivez l'état, les caractéristiques, les défauts éventuels..."
          className="w-full rounded-xl border border-space-cadet/15 px-4 py-2.5 outline-none focus:border-space-cadet focus:ring-1 focus:ring-space-cadet"
        />
      </div>

      {/* Prix + Stock */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Prix (FCFA) *
          </label>
          <input
            type="number"
            name="price"
            value={form.price || ""}
            onChange={handleChange}
            required
            min={0}
            className="w-full rounded-xl border border-space-cadet/15 px-4 py-2.5 outline-none focus:border-space-cadet"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            min={0}
            className="w-full rounded-xl border border-space-cadet/15 px-4 py-2.5 outline-none focus:border-space-cadet"
          />
        </div>
      </div>

      {/* Catégorie + État */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Catégorie *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-space-cadet/15 px-4 py-2.5 outline-none focus:border-space-cadet"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">État *</label>
          <div className="flex flex-wrap gap-2">
            {CONDITIONS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm((p) => ({ ...p, condition: c }))}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  form.condition === c
                    ? "bg-space-cadet text-white"
                    : "bg-alice-blue text-space-cadet/70 hover:bg-space-cadet/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Localisation */}
      <div>
        <label className="mb-1.5 block text-sm font-medium">Localisation</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Yaoundé, Douala..."
          className="w-full rounded-xl border border-space-cadet/15 px-4 py-2.5 outline-none focus:border-space-cadet"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-xl border border-space-cadet/20 px-5 py-2.5 text-sm font-medium text-space-cadet hover:bg-alice-blue"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-space-cadet px-6 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
