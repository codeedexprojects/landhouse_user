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
    const token = localStorage.getItem('adminToken');
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
    const token = localStorage.getItem('adminToken'); 
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
    const token = localStorage.getItem('adminToken'); 
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

// edit property
export const EditPropertyAPI = async (id, updateData) => {
  
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(`${BASE_URL}/admin/property/update/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
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
    const token = localStorage.getItem('adminToken'); 
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
    const token = localStorage.getItem('adminToken'); 
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


//get user details
export const getUserDetails = async (id) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}/admin/use/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // or response.data.user, depending on backend
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const addVendor = async (reqBody) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.post(`${BASE_URL}/admin/vendor/register`, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getVendors = async () => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/vendor/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getReferrals = async () => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/user/referrals`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const approveVendor = async (vendorId) => {
  try {
    const token = localStorage.getItem('adminToken');
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
    const token = localStorage.getItem('adminToken');
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

export const getEnquireis = async () => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/enquiry/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleVendor = async (vendorId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/get/${vendorId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error single vendor:', error);
    throw error;
  }
};

export const vendorPageCounts = async (vendorId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/${vendorId}/property-count`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting  vendor counts:', error);
    throw error;
  }
};

export const vendorProperties = async (vendorId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(
      `${BASE_URL}/admin/vendor/${vendorId}/properties`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting  vendor counts:', error);
    throw error;
  }
};

export const overviewCounts = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(
      `${BASE_URL}/admin/overview/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting  overview counts:', error);
    throw error;
  }
};

export const getAdminProfile = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/auth/profile/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (id, updateData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(`${BASE_URL}/admin/auth/profile/${id}`, updateData, {
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

export const getOverviewGraph = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/overview/enquiry-stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addAffiliate = async (reqBody) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.post(
      `${BASE_URL}/admin/affiliate/add`,reqBody,
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

export const getAffiliates = async () => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/affiliate/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAffiliate = async (id, updateData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(`${BASE_URL}/admin/affiliate/update/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const deleteVendor = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.delete(`${BASE_URL}/admin/vendor/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateVendor = async (id, updateData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(`${BASE_URL}/admin/vendor/update/${id}`, updateData, {
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

export const getEnquireisVendor = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/vendor/get/enquiries/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const adminSoldOutAPI = async (id, soldOut) => {
  try {
    const token = localStorage.getItem("adminToken"); 

    const response = await axios.put(
      `${BASE_URL}/admin/property/soldout/${id}`,
      { soldOut },  
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating sold out status:", error);
    throw error;
  }
};


export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.delete(`${BASE_URL}/admin/user/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const approveAffiliate = async (affiliateId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.patch(
      `${BASE_URL}/admin/affiliate/approve/${affiliateId}`,
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

export const getAffiliateRequest = async () => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/affiliate/requests`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getEnquiryCounts = async () => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/enquiry/unread-count`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const markAsReadEnquiry = async (id) => {
  try {
    const token = localStorage.getItem("adminToken"); 

    const response = await axios.patch(
      `${BASE_URL}/admin/enquiry/${id}/mark-read`,
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

export const getLatestEnquireisProperty = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/enquiry/property/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDistricts = async () => {
  try {
    const token = localStorage.getItem('adminToken');
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

// Add a sub-place to a district
export const addSubPlace = async ({ districtId, subPlaceName, nearPlaces }) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.post(
      `${BASE_URL}/admin/place/sub-places`,
      { 
        districtId, 
        subPlaceName, 
        nearPlaces 
      },
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


export const deletePlace = async (districtId,subPlaceId) => {
  try {
    const token = localStorage.getItem('adminToken');
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
export const getRecentAffliateUsers = async (id) => {
  try {
    const token = localStorage.getItem('adminToken'); 
    const response = await axios.get(`${BASE_URL}/admin/affiliate/recent-users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const contactUsAPI = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}/admin/contact/view`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw error;
  }
};

export const homeLoanMarkAs = async (id, isRead) => {
  try {
    const token = localStorage.getItem("adminToken"); 

    const response = await axios.patch(
      `${BASE_URL}/admin/homeloan/mark-read/${id}`,
      { isRead },  
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating sold out status:", error);
    throw error;
  }
};

export const approveProperty = async (id, isApproved) => {
  try {
    const token = localStorage.getItem("adminToken"); 

    const response = await axios.patch(
      `${BASE_URL}/admin/property/approve/${id}`,
      { isApproved },  
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating sold out status:", error);
    throw error;
  }
};

export const getPendingProperties = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await axios.get(`${BASE_URL}/admin/property/get/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw error;
  }
};