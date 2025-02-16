import prisma from '@/libs';

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

const Store = {
  create, getAll, updateById, getByStore
};

export default Store;
