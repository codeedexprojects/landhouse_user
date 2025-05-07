import axios from 'axios';
import { BASE_URL } from '../baseUrl';


export const sendRegisterOTP = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/affiliate/auth/register`, reqBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const verifyRegisterOTP = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/affiliate/auth/verify-otp`, reqBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Verification failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const sendLoginOTP = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/affiliate/auth/login/request-otp`, reqBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const verifyLoginOTP = async (reqBody) => {
  try {
    const response = await axios.post(`${BASE_URL}/affiliate/auth/login/verify-otp`, reqBody);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Verification failed');
    }
    throw new Error('Network error. Please try again.');
  }
};