import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const AdminLogin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    throw new Error(message);
  }
};


//addproperty

export const addProperty = async (propertyData) => {
  console.log(propertyData);

    try {
      const token = localStorage.getItem('admintoken');
      const formData = new FormData();
  
      Object.entries(propertyData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${BASE_URL}/admin/property/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.log(error);

      throw error.response?.data || { message: 'Something went wrong' };
    }
};


//getAllProperties

export const getAllProperties = async()=>{
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.get(`${BASE_URL}/admin/property/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response?.data?.success) {
      return response?.data?.properties;
    } else {
      return [];
    }
  } catch (error) {
    alert('Fetching Error: ' + error.message);
    return []; 
  }

}

// delete property
export const deletePropertyAPI = async (id) => {
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.delete(`${BASE_URL}/admin/property/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}


// edit property
export const EditPropertyAPI = async (id)=>{
  try{
    const token = localStorage.getItem('admintoken');
    const response = await axios.edit(`${BASE_URL}/admin/property/edit/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  }catch(error){
    console.log(error);
    
  }
}