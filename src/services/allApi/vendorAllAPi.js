import axios from "axios";
import { BASE_URL } from "../baseUrl";


export const sendOtp = async (number, role) => {
    try {
        const response = await axios.post(`${BASE_URL}/vendor/auth/send-otp/login`, {
            number,
            role
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const verifyOtpForLogin = async (number, role, otp) => {
    try {
        const response = await axios.post(`${BASE_URL}/vendor/auth/verify-otp/login`, {
            number,
            role,
            otp
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const sendOtpForRegistration = async (registrationData) => {
    try {
      const response = await axios.post(`${BASE_URL}/vendor/auth/send-otp/register`, registrationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Error setting up request');
      }
    }
  };
  
  export const verifyRegistrationOtp = async (number, otp) => {
    try {
      const response = await axios.post(`${BASE_URL}/vendor/auth/verify-otp/register`, {
        number,
        otp
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Verification failed');
      } else if (error.request) {
        throw new Error('No response from server');
      } else {
        throw new Error('Error setting up request');
      }
    }
  };