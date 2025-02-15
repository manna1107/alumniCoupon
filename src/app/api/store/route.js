import Store from '../../../services/Store'; 
import { NextRequest, NextResponse } from 'next/server';

async function POST(req) {
  try {

    const data = await req.json();
    console.log(data);

    const res = await Store.create(data);

    return NextResponse.json({
      code: 201,
      message: 'Store created successfully',
      data: res,
    });
  } catch (error) {
    console.error('Error creating store:', error);

  
    return NextResponse.json({
      code: 500,
      message: 'Failed to create store',
      error: error.message,
    });
  }
}

async function GET() {
  const res = await Store.getAll();

  if (res) {
    return NextResponse.json({
      code: 201,
      message: 'Store All',
      body: res,
    });
  }

  return NextResponse.json({
    code: 400,
    message: 'Error GET Data',
  });
}

export { POST, GET };
