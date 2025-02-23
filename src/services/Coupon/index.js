import prisma from '@/libs';
import { DatasetLinkedTwoTone, DatasetOutlined } from '@mui/icons-material';


async function create(data) {
  
  try {
    console.log("Received data:", data);
    //const imageBuffer = fs.readFileSync(imageFile.filepath);

    const res = await prisma.ticket.create({
      data: {
        coupon_id: data.coupon_id,
        store_id: data.store_id ,
        name_coupon: data.name_coupon || '',
        start_Date: data.start_Date || new Date(),
        end_Date: data.end_Date || new Date(),
        type: data.type || '',
        number_of_coupons: data.number_of_coupons ,
        details: data.details || '',
        
      }
    });

    return res;
  } catch (error) {
    console.error('Error creating coupon:', error.message);
    throw error;
  }
}

async function get() {
  try {
    const res = await prisma.ticket.findMany({});
    return res;
  } catch (error) {
    console.error('Error fetching coupons:', error.message);
    throw error;
  }
}

async function getAll() {
  try {
    const res = await prisma.ticket.findMany({
      where: {
        end_Date: {
          gte: new Date() // ตรวจสอบคูปองที่ยังไม่หมดอายุ
        },
      },
    });
    return res;
  } catch (error) {
    console.error('Error fetching coupons:', error.message);
    throw error;
  }
}

// ✅ อัปเดตข้อมูลคูปอง
async function updateById(id, datas) {
  try {
    console.log("Received data:", id, datas);

    const idAsInt = Number(id);
    const updatedCoupon = await prisma.ticket.update({
      where: {
        coupon_id: idAsInt,
      },
      data: {
        name_coupon: datas.name_coupon || '',
        start_Date: datas.start_Date || new Date(),
        end_Date: datas.end_Date || new Date(),
        type: datas.type || '',
        number_of_coupons: datas.number_of_coupons ,
        details: datas.details || '',
       
      }
        
      },
    );

    return updatedCoupon;


  } catch (error) {
    console.error("Error updating coupon:", error);
    throw new Error("Failed to update coupon");
  }


}

async function getByCoupon(id) {
  const idAsInt = Number(id);
  const res = await prisma.ticket.findUnique({
    where: {
      coupon_id: idAsInt,
    },
  });
  return res;
}

async function remove(coupon) {

  const couponed = await prisma.ticket.findUnique({
    where: {
      coupon_id: coupon,
    },
  });
  // console.log(typeof coupon_id);
  if (couponed){
    const res = await prisma.ticket.delete({
      where: {
        coupon_id: coupon, // แปลงเป็นตัวเลขก่อนใช้
      },
    });
    return res; // คืนค่าข้อมูลที่ถูกลบ
  } else  {
    console.error("Error deleting coupon:", error);

    if (error.code === "P2025") {
      // Prisma error: Record to delete does not exist
      throw new Error("Coupon not found");
    }

    throw new Error("Failed to delete coupon");
  }
}


// async function couponLimit(coupon_id) {
//   try {
//     const coupon = await prisma.ticket.findUnique({
//       where: { coupon_id: Number(coupon_id) }, // แปลงเป็นตัวเลข
//       include: {
//         saved_coupons: true, // ✅ ใช้ฟิลด์ที่มีอยู่จริง
//         store: true, // ✅ ถ้ามีใน schema
//       },
//     });

//     return coupon;
//   } catch (error) {
//     console.error("Error fetching coupon limit:", error);
//     throw new Error("Database error");
//   }
// }

// Export ฟังก์ชันทั้งหมด
const Coupon = {   
  create, 
  getAll,
  get,
  updateById,
  getByCoupon,
  remove
  //couponLimit
};

export default Coupon;
