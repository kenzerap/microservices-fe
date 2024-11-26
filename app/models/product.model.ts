import { Category } from './category.model';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls?: string[];
  description: string;
  category?: Category;
  soldCount: number;
  discountPercentage: number;
  rate?: { averageValue: number; rateCount: number };
}
