import prisma from '@/libs/Prisma';

async function create(data) {
  try {
    console.log("Received data:", data);

    const res = await prisma.store.create({
      data: {
        store_id: data.store_id,
        store_name: data.store_name || '',
        location: data.location || '',
        address: data.address || ''
      }
    });

    return res;

  } catch (error) {
    console.error('Error creating store:', error.message);
    throw error;
  }
}


async function getAll() {
  const res = await prisma.store.findMany({

  });
  return res;
}

async function updateById(id, data) {
  try {
    console.log("Received data:", id, data);

    const idAsInt = Number(id);
    const updatedStore = await prisma.store.update({
      where: {
        store_id: idAsInt,
      },
      data: {
        store_name: data.store_name || '',
        location: data.location || '',
        address: data.address || ''
      },
    });

    return updatedStore;


  } catch (error) {
    console.error("Error updating store:", error);
    throw new Error("Failed to update store");
  }


}

async function getByStore(id) {
  const idAsInt = Number(id);
  const res = await prisma.store.findUnique({
    where: {
      store_id: idAsInt,
    },
  });
  return res;
}

async function remove(store) {

  const stored = await prisma.store.findUnique({
    where: {
      store_id: store,
    },
  });
  // console.log(typeof store_id);
  if (stored){
    const res = await prisma.store.delete({
      where: {
        store_id: store, // แปลงเป็นตัวเลขก่อนใช้
      },
    });
    return res; // คืนค่าข้อมูลที่ถูกลบ
  } else  {
    console.error("Error deleting store:", error);

    if (error.code === "P2025") {
      // Prisma error: Record to delete does not exist
      throw new Error("Store not found");
    }

    throw new Error("Failed to delete store");
  }
}

const Store = {
  create,  updateById, getByStore, remove ,getAll
};

export default Store;
