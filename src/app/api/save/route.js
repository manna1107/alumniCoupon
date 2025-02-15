import Save from '../../../services/Save'; 
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs';

async function POST(req) {
  try {

    const data = await req.json();
    console.log(data);

    const res = await Save.create(data);

    return NextResponse.json({
      code: 201,
      message: 'Save created successfully',
      data: res,
    });
  } catch (error) {
    console.error('Error creating save:', error);

  
    return NextResponse.json({
      code: 500,
      message: 'Failed to create save',
      error: error.message,
    });
  }
}

async function GET() {
  const res = await Save.getAll();

  if (res) {
    return NextResponse.json({
      code: 201,
      message: 'Saved_coupons All',
      body: res,
    });
  }

  return NextResponse.json({
    code: 400,
    message: 'Error GET Data',
  });
}



export { POST, GET };
