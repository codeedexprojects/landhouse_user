import React, { useState, useEffect } from 'react';
import { getAdminProfile, updateProfile } from '../../services/allApi/adminAllApis';

export default function AdminProfile() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    address: '',
    number: '',
    profileImage: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const BASE_URL = "https://landouse-backend.onrender.com";

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminId = localStorage.getItem('adminId');
        if (adminId) {
          const data = await getAdminProfile(adminId);
          setAdminData(data.admin);
          setFormData({
            name: data.admin.name,
            email: data.admin.email,
            dob: data.admin.dob,
            address: data.admin.address,
            number: data.admin.number,
            profileImage: null
          });
          setPreviewImage(data.admin.profileImage ? `${BASE_URL}/${data.admin.profileImage}` : '/api/placeholder/130/130');
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem('adminId');
      const formDataToSend = new FormData();
      
      if (formData.name) formDataToSend.append('name', formData.name);
      if (formData.email) formDataToSend.append('email', formData.email);
      if (formData.dob) formDataToSend.append('dob', formData.dob);
      if (formData.address) formDataToSend.append('address', formData.address);
      if (formData.number) formDataToSend.append('number', formData.number);
      if (formData.profileImage) formDataToSend.append('profileImage', formData.profileImage);

      const updatedData = await updateProfile(adminId, formDataToSend);
      setAdminData(updatedData.admin);
      setIsModalOpen(false);
      if (formData.profileImage) {
        setPreviewImage(URL.createObjectURL(formData.profileImage));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="bg-blue-50 min-h-screen p-4 flex justify-center items-center">Loading...</div>;
  }

  if (!adminData) {
    return <div className="bg-blue-50 min-h-screen p-4 flex justify-center items-center">Error loading admin profile</div>;
  }

  const nameParts = adminData.name ? adminData.name.split(' ') : ['', ''];
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Admin details header */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Admin Profile</span>
          <div className="ml-auto">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      
      {/* Profile card */}
      <div className="bg-white rounded-lg shadow-sm mb-4 p-6">
        <div className="flex items-center">
          <div className="relative">
            <img 
              src={previewImage} 
              alt="Admin profile" 
              className="w-24 h-24 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/api/placeholder/130/130';
              }}
            />
            <div className="absolute bottom-0 right-0 bg-blue-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-medium">{adminData.name}</h2>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>
      </div>
      
      {/* Personal information card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 mb-2">First Name</p>
            <p className="font-medium">{firstName}</p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Last Name</p>
            <p className="font-medium">{lastName}</p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Date of Birth</p>
            <p className="font-medium">{adminData.dob ? new Date(adminData.dob).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <p className="text-gray-500 mb-2">Email Address</p>
            <p className="font-medium">{adminData.email}</p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Phone Number</p>
            <p className="font-medium">{adminData.number}</p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Address</p>
            <p className="font-medium">{adminData.address}</p>
          </div>
        </div>
      </div>

      {/* Enhanced Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl my-8">
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium">Edit Profile</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name and Email in one row */}
                  <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  {/* DOB and Phone in one row */}
                  <div>
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  {/* Full width address */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  {/* Full width profile image */}
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Profile Image</label>
                    <div className="flex items-center">
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-full object-cover mr-4"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/api/placeholder/130/130';
                        }}
                      />
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload a new profile image (max 2MB)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}