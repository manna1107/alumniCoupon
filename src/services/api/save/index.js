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

  const GetByUser = async (id) => {
    const url = `http://localhost:3000/api/save/user/${id}`;
    console.log(`Requesting: ${url}`);
    
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
    GetByUser
  };
  export default Save;