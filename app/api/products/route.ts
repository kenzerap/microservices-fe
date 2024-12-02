import { sendMessage } from '@/app/libs/kafka-producer';
import { Product } from '@/app/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const productList: Product[] = [];

    await sendMessage('GetProduct', [JSON.stringify([{ data: 'GetProduct' }])]);

    return NextResponse.json(productList);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
