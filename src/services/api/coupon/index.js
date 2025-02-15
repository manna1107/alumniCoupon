  const create = async (formData) => {  
    const url = `http://localhost:3000/api/coupon`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.data),
    });
    const data = await response.json();
    return data || [];
  };


  
  const getAll = async () => {
    const url = `http://localhost:3000/api/coupon`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const remove = async (coupon) => {
    const url = `http://localhost:3000/api/coupon`;
  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const update = async () => {
    const url = `http://localhost:3000/api/coupon`;
  
    const response = await fetch(url, {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };




  const Coupon = { 
    create, getAll, remove, update
  };
  
  export default Coupon;
  