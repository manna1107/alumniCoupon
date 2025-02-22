import Save from '../../../../../services/Save'; 
import { NextResponse } from 'next/server';


async function GET(_req , { params }) {

  const { user_id } = await params;
  const userId = parseInt(user_id, 10);

    const res = await Save.getByUser(userId);
    if (res) {
      return NextResponse.json({
        code: 200,
        message: 'Member Details',
        body: res,
      });
    }
  
    return NextResponse.json({
      code: 400,
      message: 'Not found data',
    });
  }


  async function PUT(req, { params }) {
    const { coupon_id } = await  params;
    console.log("coupon_id",coupon_id);
    
    try {
      const updatedData = await req.json(); 
      

      const updated = await Save.updateStatus(Number(coupon_id), updatedData);
      
      if (updated) {
        return NextResponse.json({
          code: 200,
          message: 'Coupon status updated successfully', 
          data: updated,
        });
      } else {
        return NextResponse.json({
          code: 404,
          message: 'Coupon not found for update',
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

  
  
  export { GET,PUT };