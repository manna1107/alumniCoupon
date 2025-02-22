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

  const update = async (coupon_id) => {
    const url = `http://localhost:3000/api/coupon/admin/${coupon_id}`;
  
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

  const getByCoupon = async (coupon_id) => {
    console.log("coupon_id in api servics",coupon_id);
    
     const url = `http://localhost:3000/api/coupon/admin/${coupon_id}`;
   
     const response = await fetch(url, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },  
     });
   
     const responseData = await response.json(); 
     return responseData ; 
   };

   const remove = async (coupon_id) => {
    const url = `http://localhost:3000/api/coupon/admin/${coupon_id}`;

    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }, 
    });

    const data = await response.json();
    return data;

    // const data = await response.json();
    // return data;
};



  const Coupon = { 
    create,  remove, getByCoupon, update ,getAll
  };
  
  export default Coupon;
  