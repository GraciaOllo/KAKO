export type ProductCondition = "Comme neuf" | "Bon état" | "Satisfaisant";

export interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  condition: ProductCondition;
}