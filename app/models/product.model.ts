import mongoose, { Model, Schema } from 'mongoose';
import { Category } from './category.model';

export interface Product extends Document {
  name: string;
  price: number;
  imageUrls?: string[];
  description: string;
  category?: Category;
  soldCount: number;
  discountPercentage: number;
  rate?: { averageValue: number; rateCount: number };
  categoryId?: string;
}

const ProductSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrls: { type: [String], required: true },
  description: { type: String, required: true },
  soldCount: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  rate: {
    averageValue: { type: Number, default: 0 },
    rateCount: { type: Number, default: 0 },
  },
  categoryId: { type: String, required: true },
});

const ProductModel: Model<Product> =
  mongoose.models.Product || mongoose.model<Product>('products', ProductSchema);

export default ProductModel;
