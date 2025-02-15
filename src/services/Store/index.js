import prisma from '@/libs';

async function create(data) {
  try {
    console.log("Received data:", data);

    const res = await prisma.store.create({
      data: {
        store_id : data.store_id ,
        store_name : data.store_name || '' ,
        location : data.location || '',
        address : data.address || ''   
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


const Store = {   
  create, getAll
};

export default Store;
