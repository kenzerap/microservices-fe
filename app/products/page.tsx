import Image from 'next/image';
import { Product } from '../models/product.model';

async function fetchProducts() {
  console.log('fetching products');
  const response = await fetch(`${process.env.PUBLIC_URL}/api/products`, {
    next: { revalidate: 0 },
  });

  // const data = ;
  return await response.json();
}

export default async function Products() {
  const products: Product[] = await fetchProducts();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 bg-gray-100">
      <div className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-gray-800">Products</h1>
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <li
              key={product.name}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-lg text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              {product.imageUrls && product.imageUrls.length > 0 && (
                <div className="flex gap-4 mt-4">
                  {product.imageUrls.map((url, index) => (
                    <div key={index} className="relative w-24 h-24">
                      <Image
                        src={url}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
