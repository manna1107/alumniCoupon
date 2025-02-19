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
  
  
  export { GET };