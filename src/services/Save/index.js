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
        saved_at: data.saved_at || new Date(),
        coupon_used_at: data.coupon_used_at || ''

      }
    });

    return res;

  } catch (error) {
    console.error('Error creating saved_coupons:', error.message);
    throw error;
  }
}


async function getByUser(user_id) {
  try {

    Number(user_id)
    const res = await prisma.saved_coupons.findMany({
      where: {
        user_id: user_id,
      },
    });
    return res;
  } catch (error) {
    console.error('Error get by user saved_coupons:', error.message);
    throw error;
  }


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
        id: id,
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


async function updateStatus(coupon_id, data) {
  try {
    console.log("Received data:", coupon_id, data);

    const findupdate = await prisma.saved_coupons.findMany(
      {
        where: {
          coupon_id: coupon_id,
          user_id: data.user_id
        },
      }
    );

    const updatedCoupon = await prisma.saved_coupons.update({
      where: {
        id: findupdate[0].coupon_id
      },
      data: {
        coupon_used_at: data || '',
      },
    });

    console.log("updatedCoupon:", updatedCoupon);

    return updatedCoupon;

  } catch (error) {
    console.error("Error updating coupon:", error);
    throw new Error("Failed to update coupon");
  }
}




const Save = {
  create,
  getAll,
  getByUser,
  updateStatus
  
};

export default Save;
