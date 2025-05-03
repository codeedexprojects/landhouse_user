import axios from "axios";
import { BASE_URL } from "../baseUrl";
import { toast } from "react-toastify";

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
}

// delete property
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
}

export const addVendor = async (reqBody) => {
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.post(`${BASE_URL}/admin/vendor/register`, reqBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getVendors = async () => {
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.get(`${BASE_URL}/admin/vendor/get`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const getReferrals = async () => {
  try {
    const token = localStorage.getItem('admintoken'); 
    const response = await axios.get(`${BASE_URL}/admin/user/referrals`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export const approveVendor = async (vendorId) => {
  try {
    const token = localStorage.getItem('admintoken');
    const response = await axios.post(
      `${BASE_URL}/admin/vendor/approve/${vendorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error approving vendor:', error);
    throw error;
  }
};

export const rejectVendor = async (vendorId) => {
  try {
    const token = localStorage.getItem('admintoken');
    const response = await axios.delete(
      `${BASE_URL}/${vendorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error rejecting vendor:', error);
    throw error;
  }
};
