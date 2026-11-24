import { apiBaseUrl } from "./client";
import type { Product, ProductFormData } from "../../types/product";

const getToken = () => localStorage.getItem("token");

const headers = (isFormData = false): HeadersInit => {
  const h: HeadersInit = {};
  const token = getToken();
  if (token) h["Authorization"] = `Bearer ${token}`;
  if (!isFormData) h["Content-Type"] = "application/json";
  return h;
};

export const productApi = {
  getAll: async (params?: {
    category?: string;
    search?: string;
    page?: number;
  }) => {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.search) q.set("search", params.search);
    if (params?.page) q.set("page", String(params.page));
    const res = await fetch(`${apiBaseUrl}/products?${q}`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error("Erreur chargement produits");
    return res.json();
  },

  getMine: async (): Promise<Product[]> => {
    const res = await fetch(`${apiBaseUrl}/products/mine/list`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error("Erreur chargement mes produits");
    return res.json();
  },

  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`${apiBaseUrl}/products/${id}`, {
      headers: headers(),
    });
    if (!res.ok) throw new Error("Produit introuvable");
    return res.json();
  },

  create: async (data: ProductFormData): Promise<Product> => {
    const form = new FormData();
    form.append("title", data.title);
    form.append("description", data.description);
    form.append("price", String(data.price));
    form.append("category", data.category);
    form.append("condition", data.condition);
    form.append("stock", String(data.stock));
    form.append("location", data.location);
    if (data.images) {
      Array.from(data.images).forEach((file) => form.append("images", file));
    }

    const res = await fetch(`${apiBaseUrl}/products`, {
      method: "POST",
      headers: headers(true),
      body: form,
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erreur création");
    }
    return res.json();
  },

  update: async (
    id: string,
    data: Partial<ProductFormData>
  ): Promise<Product> => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "images" && value) {
        Array.from(value as FileList).forEach((f) => form.append("images", f));
      } else if (value !== undefined && value !== null) {
        form.append(key, String(value));
      }
    });

    const res = await fetch(`${apiBaseUrl}/products/${id}`, {
      method: "PUT",
      headers: headers(true),
      body: form,
    });
    if (!res.ok) throw new Error("Erreur mise à jour");
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`${apiBaseUrl}/products/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (!res.ok) throw new Error("Erreur suppression");
    return res.json();
  },
};
