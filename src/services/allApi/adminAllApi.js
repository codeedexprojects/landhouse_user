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

export const addProperties = async (propertyData) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
  
      Object.entries(propertyData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, value);
        }
      });
      console.log(formData);

      const response = await axios.post(`${BASE_URL}/admin/property/add`,
        formData,
        {
          headers: {
            Authorization: Bearer `${token}`,
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