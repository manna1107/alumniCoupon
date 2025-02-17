import { NextResponse } from 'next/server';
import Coupon from '../../../../../services/Coupon'; 


async function GET(_req, { params }) {


    const { coupon_id } = await params;
    
    console.log(coupon_id);
    
    const res = await Coupon.getByCoupon(coupon_id);

    if (res) {
      return NextResponse.json({
        code: 200,
        message: 'coupon Details',
        body: res,
      });
    }
  
    return NextResponse.json({
      code: 400,
      message: 'Not found data',
    });
  }

  

async function PUT(req, { params }) {
    const { coupon_id } = await params;
   
  try {
    const updatedData = await req.json(); 

    const updated = await Coupon.updateById(coupon_id , updatedData);
    
    if (updated) {
      return NextResponse.json({
        code: 200,
        message: 'Class updated successfully',
        data: updated,
      });
    } else {
      return NextResponse.json({
        code: 404,
        message: 'Class not found for update',
      });
    }
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}




  export { PUT ,GET };