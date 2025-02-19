import prisma from '@/libs';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

async function create(data) {
  
  try {
    console.log("Received data:", data);
    const imageBuffer = fs.readFileSync(imageFile.filepath);

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
        image: imageBuffer, 
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
async function updateById(id, data) {
  try {
    console.log("Received data:", id, data);

    const idAsInt = Number(id);
    const updatedCoupon = await prisma.ticket.update({
      where: {
        coupon_id: idAsInt,
      },
      data: {
        name_coupon: data.name_coupon || '',
        start_Date: data.start_Date || new Date(),
        end_Date: data.end_Date || new Date(),
        type: data.type || '',
        number_of_coupons: data.number_of_coupons ,
        details: data.details || '',
        image: data.image || ''
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


// Export ฟังก์ชันทั้งหมด
const Coupon = {   
  create, 
  getAll,
  get,
  updateById,
  getByCoupon,
  remove
};

export default Coupon;
