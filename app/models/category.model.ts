export interface Category {
  name: string;
  code: string;
  imageUrl: string;
  description: string;
}

// const CategorySchema: Schema = new Schema({
//   name: { type: String, required: true },
//   code: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   description: { type: String, required: true },
// });

// export default mongoose.models.Category || mongoose.model<Category>('Category', CategorySchema);
