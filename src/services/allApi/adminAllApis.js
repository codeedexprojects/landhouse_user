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

// add property
export const addProperty = async (formData) => {
  try {
    const token = localStorage.getItem('admintoken');
    const response = await axios.post(
      `${BASE_URL}/admin/property/add`,
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
    console.error("API Error:", error);
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

// get all properties
export const getAllProperties = async () => {
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
};

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
};

// edit property (you probably meant PATCH or PUT, not "edit" method)
export const EditPropertyAPI = async (id, updateData) => {
  try {
    const token = localStorage.getItem('admintoken');
    const response = await axios.patch(`${BASE_URL}/admin/property/edit/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get home loan enquiries
export const getLoanEnquiries = async () => {
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.get(`${BASE_URL}/admin/homeloan/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.enquiries;
  } catch (error) {
    console.log(error);
  }
};

// get user list
export const getUserList = async () => {
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.get(`${BASE_URL}/admin/user/view`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.users;
  } catch (error) {
    console.log(error);
  }
};
