const create = async (formData) => {  
    const url = `http://localhost:3000/api/store`;
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
    const url = `http://localhost:3000/api/store`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };


  const update = async (store_id, data) => {
    const url = `http://localhost:3000/api/store/admin/${store_id}`;
  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const responseData = await response.json(); 
    return responseData ; 
  };
  

  const getBystore = async (store_id) => {
   console.log("store_id in api servics",store_id);
   
    const url = `http://localhost:3000/api/store/admin/${store_id}`;
  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },  
    });
  
    const responseData = await response.json(); 
    return responseData ; 
  };

  const remove = async () => {
    const url = `http://localhost:3000/api/store`;
  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const Store = { 
    create, getAll, update, remove ,getBystore
  };
  

  export default Store;