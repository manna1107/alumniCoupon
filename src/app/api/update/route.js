import { prisma } from '@/libs'; 
import { NextResponse } from 'next/server';

// ดึงข้อมูลคูปองตาม ID
async function GET(req, { params }) {
  try {
    const { id } = params;
    const coupon = await prisma.ticket.findUnique({
      where: { coupon_id: parseInt(id) },
    });

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(coupon, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// อัพเดทข้อมูลคูปอง
async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();

    const updatedCoupon = await prisma.ticket.update({
      where: { coupon_id: parseInt(id) },
      data,
    });

    return NextResponse.json({ success: true, updatedCoupon }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export { GET, PUT };
