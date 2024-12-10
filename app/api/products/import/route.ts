// import dbConnect from '@/app/libs/mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestJson = await request.json();
  const products = JSON.parse(requestJson);
  /* const productsModelModified: Product[] = products.map((product: any) => ({
    name: product.name,
    price: product.price,
    imageUrls: product.imageUrls,
    description: product.description,
    soldCount: product.soldCount,
    discountPercentage: product.discountPercentage,
    rate: product.rate,
    categoryId: product.categoryId,
  })); */
  console.log('products: ', products);

  try {
    // await dbConnect();

    // const result = await ProductModel.insertMany(productsModelModified);

    return NextResponse.json({
      message: 'Products processed successfully',
      products,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to process products', details: error },
      { status: 500 }
    );
  }
}
