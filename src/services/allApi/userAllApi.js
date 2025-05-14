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
    console.log("Raw API response:", response);
    if (response.data.success) {
      return response.data.property;
    } else {
      throw new Error(response.data.message || 'Failed to fetch property');
    }
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

export const addToFavorites = async (userId, propertyId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/user/favourite/add`, { userId, propertyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL}/user/favourite/get/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const sendEnquiry = async (userId, enquiryData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/user/enquiry/send/${userId}`,
      enquiryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const sendLoanEnquiry = async (enquiryData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/user/homeloan/create`,
      enquiryData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const addProperty = async (propertyData) => {
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
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const removeFromFavorites = async (userId, propertyId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(
    `${BASE_URL}/user/favourite/remove/${userId}/${propertyId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const addToCompare = async (reqBody) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/user/compare/add`,
      reqBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const getComparisons = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL}/user/compare/list/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const deleteCompare = async (propertyId, reqBody) => {
  try {
    const token = localStorage.getItem('token');
    const { userId } = reqBody;
    const response = await axios.delete(
      `${BASE_URL}/user/compare/remove/${propertyId}?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing from compare:', error);
    throw error;
  }
};

export const deleteFavourite = async (propertyId, reqBody) => {
  try {
    const token = localStorage.getItem('token');
    const { userId } = reqBody;
    const response = await axios.delete(
      `${BASE_URL}/user/favourite/remove/${propertyId}?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error removing favourite:', error);
    throw error;
  }
};

export const getProfile = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL}/user/auth/profile/view/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
};

export const updateProfile = async (userId, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${BASE_URL}/user/auth/profile/${userId}`,
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
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const contactUs = async (reqBody) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/contact/create`,
      reqBody,{}
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Something went wrong' };
  }
};

export const fetchDistricts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/place/get`, {

    });
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};