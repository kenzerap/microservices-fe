import FileUploaded from '@/app/models/uploaded-file.model';
import dbConnect from '../../libs/mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/app/libs/kafka-producer';

export async function POST(request: NextRequest) {
  const requestJson = await request.json();

  try {
    await dbConnect();

    const data = new FileUploaded({
      data: JSON.stringify(requestJson),
    });
    await data.save();

    await sendMessage('FileUploaded', [JSON.stringify(requestJson)]);

    return NextResponse.json(requestJson);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
