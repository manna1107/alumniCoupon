import prisma from '@/libs';
import { getSession } from 'next-auth/react'; // ใช้ next-auth เพื่อดึง session ของผู้ใช้

async function create(data) {
  try {
    console.log("Received data:", data);

    const res = await prisma.saved_coupons.create({
      data: {
        id: data.id,
        user_id: data.user_id || '',
        coupon_id: data.coupon_id || '',
        saved_at: data.saved_at || new Date()   
      }
    });

    return res;

  } catch (error) {
    console.error('Error creating saved_coupons:', error.message);
    throw error;
  }
}


async function getByUser(id) {
  const res = await prisma.saved_coupons.findMany({
    where: {
      user_id: id,
    },
  });
  return res;
}

async function getAll(id) {
  try {
    
   /* if (!session || !session.user.user_id) {
      throw new Error("User not logged in");
    }
*/
   // const user_id = session.user.user_id; 

    const res = await prisma.saved_coupons.findMany({
      where: {
        id : id, 
      //  end_Date: {
      //    gte: new Date(), 
      //  }
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching coupons:", error.message);
    throw error;
  }
}

// Export ฟังก์ชันทั้งหมด
const Save = {   
  create,
  getAll,
  getByUser
};

export default Save;
