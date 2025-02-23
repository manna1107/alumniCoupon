import Coupon from '../../../services/Coupon'; 
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs';

async function POST(req) {
  try {

    const data = await req.json();
    console.log(data);

    const res = await Coupon.create(data);

    return NextResponse.json({
      code: 201,
      message: 'Coupon created successfully',
      data: res,
    });
  } catch (error) {
    console.error('Error creating coupon:', error);

  
    return NextResponse.json({
      code: 500,
      message: 'Failed to create coupon',
      error: error.message,
    });
  }
}


async function GET() {
  const res = await Coupon.getAll();
  

  if (res) {
    return NextResponse.json({
      code: 201,
      message: 'Coupon All',
      body: { res, limit },
    });
  }

  return NextResponse.json({
    code: 400,
    message: 'Error GET Data',
  });
}




async function DELETE(coupon_id) {
  const res = await Coupon.remove(coupon_id);

  if (res) {
    return NextResponse.json({
      code: 201,
      message: 'Coupon delete',
      body: res,
    });
  }

  return NextResponse.json({
    code: 400,
    message: 'Error delete coupon',
  });
}







export { POST, GET, DELETE };


