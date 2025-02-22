const create = async (formData) => {  
    const url = `http://localhost:3000/api/save`;
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

  const GetByUser = async (user_id) => {
   
    const url = `http://localhost:3000/api/save/user/${user_id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const update = async (coupon_id,data) => {  
    const url = `http://localhost:3000/api/save/coupon/${coupon_id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData || [];
  };

  
  const getAll = async () => {
    const url = `http://localhost:3000/api/save`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };
  
  const Save = { 
    create,
    getAll,
    GetByUser,
    update
  };
  export default Save;