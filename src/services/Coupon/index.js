import prisma from '@/libs';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

async function create(data) {
  try {
    console.log("Received data:", data);

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
        image: data.image || ''
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
async function update(coupon_id, data) {
  try {
    const res = await prisma.ticket.update({
      where: { coupon_id },
      data: {
        name_coupon: data.name_coupon || "",
        start_Date: data.start_Date || new Date(),
        end_Date: data.end_Date || new Date(),
        type: data.type || "",
        number_of_coupons: data.number_of_coupons || 0,
        details: data.details || "",
      }
    });
    return res;
  } catch (error) {
    console.error('Error updating coupon:', error.message);
    throw error;
  }
}

// ✅ ลบคูปอง
async function remove(coupon_id) {
  try {
    const res = await prisma.ticket.delete({
      where: { coupon_id }
    });
    return res;
  } catch (error) {
    console.error('Error deleting coupon:', error.message);
    throw error;
  }
}

// Export ฟังก์ชันทั้งหมด
const Coupon = {   
  create, 
  getAll,
  get,
  update,
  remove
};

export default Coupon;
