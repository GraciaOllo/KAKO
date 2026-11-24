export type ProductStatus =
  | "brouillon"
  | "en_moderation"
  | "approuve"
  | "rejete"
  | "vendu";

export type ProductCondition = "Neuf" | "Comme neuf" | "Bon état" | "Correct";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: ProductCondition;
  images: string[];
  stock: number;
  status: ProductStatus;
  seller: string | { _id: string; name: string };
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: ProductCondition;
  stock: number;
  location: string;
  images?: FileList | null;
}
