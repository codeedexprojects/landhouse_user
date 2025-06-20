import React, { useState, useEffect } from 'react';
import { getVendorProfile, updateVendorProfile } from '../../services/allApi/vendorAllAPi';

function ProfileVendor() {
  const [profile, setProfile] = useState({
    name: '',
    role: '',
    number: '',
    city: '',
    state: '',
    postCode: '',
    email: '',
    aboutVendor: '',
    profileImage: null
  });
  
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Get vendor ID from localStorage or context
  const vendorId = localStorage.getItem('vendorId') 

  // Fetch vendor profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getVendorProfile(vendorId);
      
      if (response && response.success && response.vendor) {
        const { vendor } = response;
        setProfile({
          name: vendor.name || '',
          role: vendor.role || '',
          number: vendor.number || '',
          city: vendor.city || '',
          state: vendor.state || '',
          postCode: vendor.postCode || '',
          email: vendor.email || '',
          aboutVendor: vendor.aboutVendor || '',
          profileImage: vendor.profileImage || null
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUpdateLoading(true);
      
      // Create FormData for image upload
      const formData = new FormData();
      
      // Add all profile fields to formData
      Object.keys(profile).forEach(key => {
        if (key !== 'profileImage') {
          formData.append(key, profile[key]);
        }
      });
      
      // Add image if selected
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }
      
      const response = await updateVendorProfile(vendorId, formData);
      
      // Enhanced response logging and handling
      console.log('Update API Response:', response);
      console.log('Response status:', response?.status);
      console.log('Response data:', response?.data);
      
      // Check for different possible success indicators
      const isSuccess = response && (
        response.success === true ||
        response.status === 200 ||
        response.status === 'success' ||
        (response.data && response.data.success === true) ||
        response.message === 'Profile updated successfully' ||
        response.message?.includes('success') ||
        response.message?.includes('updated')
      );
      
      if (isSuccess) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        // Clear selected image after successful update
        setSelectedImage(null);
        setImagePreview(null);
        // Refresh profile data
        await fetchProfile();
      } else {
        // Log the exact response structure for debugging
        console.warn('Update response structure:', JSON.stringify(response, null, 2));
        throw new Error(`Update failed - Response: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      console.error('Error details:', error.message);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setUpdateLoading(false);
      
      // Clear message after 5 seconds (increased from 3)
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 p-4 font-sans flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 font-sans">
      <div className="w-full">
        {/* Header with emoji and name */}
        <div className="mb-4">
          <h1 className="text-xl text-blue-500 font-medium flex items-center">
            <span className="mr-2">🎉</span> Hey {profile.name},
          </h1>
        </div>

        {/* Status message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        {/* Verified phone number */}
        <div className="mb-6">
          <div className="bg-blue-100 rounded-md p-3 flex justify-between items-center">
            <span className="text-gray-700">
              verified phone number : <span className="font-bold">{profile.number}</span>
            </span>
            <button className="text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Section title */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Update Your Profile</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form and Profile Image Side by Side */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Form fields */}
            <div className="flex-1 space-y-4">
              {/* Role dropdown */}
              <div>
                <label className="block mb-1 text-gray-700">Choose your Role</label>
                <select 
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
                >
                  <option value="">Select Role</option>
                  <option value="Vendor">Vendor</option>
                  <option value="Employee">Employee</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>

              {/* Email field */}
              <div>
                <label className="block mb-1 text-gray-700">Enter your E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
                />
              </div>

              {/* Postcode field */}
              <div>
                <label className="block mb-1 text-gray-700">Enter your post code</label>
                <input
                  type="text"
                  name="postCode"
                  value={profile.postCode}
                  onChange={handleChange}
                  placeholder="Enter your postcode"
                  className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
                />
              </div>

              {/* City field */}
              <div>
                <label className="block mb-1 text-gray-700">Enter your city</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
                />
              </div>

              {/* State field */}
              <div>
                <label className="block mb-1 text-gray-700">Enter your state</label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className="w-full bg-blue-100 p-3 rounded-md text-gray-700"
                />
              </div>

              {/* About Profession */}
              <div>
                <label className="block mb-1 text-gray-700">About your profession</label>
                <textarea
                  name="aboutVendor"
                  value={profile.aboutVendor}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your profession"
                  className="w-full bg-blue-100 p-3 rounded-md text-gray-700 resize-none"
                />
              </div>
            </div>

            {/* Profile image upload */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                {(imagePreview || profile.profileImage) ? (
                  <div className="w-32 h-32 rounded-md overflow-hidden">
                    <img 
                      src={imagePreview || `/api/placeholder/128/128`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <label className="bg-blue-100 rounded-md w-32 h-32 flex flex-col items-center justify-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    <div className="text-xs text-gray-500">Add Image</div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
                
                {/* Change image button when image exists */}
                {(imagePreview || profile.profileImage) && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              
              {profile.profileImage && !imagePreview && (
                <p className="text-xs text-gray-600">Current: {profile.profileImage.split('-').pop()}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-6">
            <button 
              type="submit"
              disabled={updateLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 disabled:bg-blue-300"
            >
              {updateLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileVendor;