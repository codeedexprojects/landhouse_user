import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const loginUser = async (phoneNumber) => {
    try {
        const response = await axios.post(`${BASE_URL}/user/auth/login`, {
            phoneNumber
        });

        return response.data; // contains token and user object
    } catch (error) {
        // Return a clear error message
        const message = error.response?.data?.message || 'Login failed';
        throw new Error(message);
    }
};

export const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${BASE_URL}/user/auth/register`, formData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: 'Something went wrong.' };
    }
};

// get properties 
export const getProperties = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/property/get`);
        if (response.data.success) {
            return response.data.properties;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
};


// get single property 
export const getSingleProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get(`${BASE_URL}/user/property/get/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Raw API response:", response); // Add this
      if (response.data.success) {
        return response.data.property; // Note: your API returns "property" not "properties"
      } else {
        throw new Error(response.data.message || 'Failed to fetch property');
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  };