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

  const Store = { 
    create, getAll
  };
  

  export default Store;