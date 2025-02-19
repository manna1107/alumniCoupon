import { NextResponse } from 'next/server';
import Store from '../../../../../services/Store'; 


async function GET(_req, { params }) {


    const { store_id } = await params;
    
    console.log(store_id);
    
    const res = await Store.getByStore(store_id);

    if (res) {
      return NextResponse.json({
        code: 200,
        message: 'store Details',
        body: res,
      });
    }
  
    return NextResponse.json({
      code: 400,
      message: 'Not found data',
    });
  }

  

async function PUT(req, { params }) {
    const { store_id } = await params;
   
  try {
    const updatedData = await req.json(); 

    const updated = await Store.updateById(store_id , updatedData);
       
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

async function DELETE(_req ,{params }
) {
  const classId = Number(params.store_id);

  console.log("classId", typeof classId);

  const deleted = await Store.remove(classId);
  if (deleted) {
    return NextResponse.json({
      code: 200,
      message: 'Class deleted successfully',
    });
  }

  return NextResponse.json({
    code: 404,
    message: 'Class not found for deletion',
  });
}


  export { PUT ,GET, DELETE};