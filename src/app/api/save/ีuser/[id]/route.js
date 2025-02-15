import Save from '../../../../../services/Save'; 
import { NextResponse } from 'next/server';


async function GET(_req , { params }) {
    const { id } = params;
    const res = await Save.getByUser(id);
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