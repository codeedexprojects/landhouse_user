import axios from "axios";
import { BASE_URL } from "../baseUrl";

export const sendOtp = async (number, role) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/vendor/auth/send-otp/login`,
      {
        number,
        role,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyOtpForLogin = async (number, role, otp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/vendor/auth/verify-otp/login`,
      {
        number,
        role,
        otp,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendOtpForRegistration = async (registrationData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/vendor/auth/send-otp/register`,
      registrationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
};

export const verifyRegistrationOtp = async (number, otp) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/vendor/auth/verify-otp/register`,
      {
        number,
        otp,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Verification failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
};

export const addPropertyVendor = async (formData) => {
  try {
    const token = localStorage.getItem("vendorToken");
    const response = await axios.post(
      `${BASE_URL}/vendor/property/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getAllVendorProperties = async () => {
  try {
    const token = localStorage.getItem("vendorToken");
    const response = await axios.get(`${BASE_URL}/vendor/property/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.data?.success) {
      return response?.data?.properties;
    } else {
      return [];
    }
  } catch (error) {
    alert("Fetching Error: " + error.message);
    return [];
  }
};

export const deletePropertyvendorAPI = async (id) => {
  try {
    const token = localStorage.getItem("vendorToken");
    const response = await axios.delete(
      `${BASE_URL}/vendor/property/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getEnquireis = async (id) => {
  try {
    const token = localStorage.getItem("vendorToken");
    const response = await axios.get(`${BASE_URL}/vendor/enquiry/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// edit vendor property

export const EditPropertyVendorAPI = async (id, updateData) => {
  try {
    const token = localStorage.getItem("vendorToken");
    console.log("Token:", token);
    const response = await axios.patch(
      `${BASE_URL}/vendor/property/update/${id}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const vendorSoldOutAPI = async (id, soldOut) => {
  try {
    const token = localStorage.getItem("vendorToken"); 

    const response = await axios.put(
      `${BASE_URL}/vendor/property/soldout/${id}`,
      { soldOut},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error marking property as sold out:", error);
    throw error;
  }
};

export const getOverviewCounts = async (id) => {
  try {
    const token = localStorage.getItem('vednorToken'); 
    const response = await axios.get(`${BASE_URL}/vendor/property/counts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGraphOverview = async (id) => {
  try {
    const token = localStorage.getItem('vendorToken'); 
    const response = await axios.get(`${BASE_URL}/vendor/enquiry/${id}/enquiry-stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVendorProfile = async (id) => {
  try {
    const token = localStorage.getItem('vednorToken'); 
    const response = await axios.get(`${BASE_URL}/vendor/auth/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateVendorProfile = async (id, updateData) => {
  try {
    const token = localStorage.getItem('admintoken');
    const response = await axios.patch(`${BASE_URL}/vendor/auth/profile/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getVendorEnquiryCounts = async (vendorId) => {
  try {
    const token = localStorage.getItem('vendorToken'); 
    const response = await axios.get(`${BASE_URL}/vendor/enquiry/${vendorId}/counts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const markAsReadVendorEnquiry = async (enquiryId) => {
  try {
    const token = localStorage.getItem("vendorToken"); 

    const response = await axios.patch(
      `${BASE_URL}/vendor/enquiry/${enquiryId}/mark-read`,
      { isRead: true },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error marking property as sold out:", error);
    throw error;
  }
};


export const fetchVendorDistricts = async () => {
  try {
    const token = localStorage.getItem('vendorToken');
    const response = await axios.get(`${BASE_URL}/admin/place/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const addVendorSubPlace = async ({ districtId, subPlaceName }) => {
  try {
    const token = localStorage.getItem('vendorToken');
    const response = await axios.post(
      `${BASE_URL}/admin/place/sub-places`,
      { districtId, subPlaceName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding sub-place:', error);
    throw error;
  }
};

export const deleteVendorPlace = async (districtId,subPlaceId) => {
  try {
    const token = localStorage.getItem('vendorToken');
    const response = await axios.delete(`${BASE_URL}/admin/place/delete/${districtId}/${subPlaceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const getLatestEnquireisProperty = async (id) => {
  try {
    const token = localStorage.getItem('vendorToken'); 
    const response = await axios.get(`${BASE_URL}/vendor/enquiry/property/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};