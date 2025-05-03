import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { approveVendor, getVendors, rejectVendor } from '../../services/allApi/adminAllApis';

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showRequests, setShowRequests] = useState(false);
  const [vendorRequests, setVendorRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch pending vendor requests
  const fetchVendorRequests = async () => {
    try {
      setLoading(true);
      const response = await getVendors();
      // Ensure we're working with an array
      const vendors = Array.isArray(response?.data) ? response.data : [];
      // Filter for pending vendors (approvalStatus: false)
      const pendingVendors = vendors.filter(vendor => !vendor.approvalStatus);
      setVendorRequests(pendingVendors);
    } catch (error) {
      console.error('Error fetching vendor requests:', error.message);
      setVendorRequests([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Handle vendor approval
  const handleApprove = async (vendorId) => {
    try {
      await approveVendor(vendorId);
      setVendorRequests(prev => prev.filter(v => v._id !== vendorId));
    } catch (error) {
      console.error('Approval failed:', error.message);
    }
  };

  // Handle vendor rejection
  const handleReject = async (vendorId) => {
    try {
      await rejectVendor(vendorId);
      setVendorRequests(prev => prev.filter(v => v._id !== vendorId));
    } catch (error) {
      console.error('Rejection failed:', error.message);
    }
  };

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  const handleMessageClick = () => {
    navigate('/admin/messages');
  };

  const handleRequestsClick = () => {
    const newState = !showRequests;
    setShowRequests(newState);
    if (newState) {
      fetchVendorRequests();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRequests(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 relative">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 focus:outline-none md:hidden mr-3"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        <div className="relative w-64 sm:w-96">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search size={20} />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          className="p-2 text-blue-500 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors"
          onClick={handleMessageClick}
        >
          <Bell size={20} />
        </button>

        {/* Vendor Requests Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-2 bg-blue-100 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors relative"
            onClick={handleRequestsClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {vendorRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {vendorRequests.length}
              </span>
            )}
          </button>

          {showRequests && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-4 z-30 max-h-96 overflow-y-auto">
              <div className="absolute top-[-10px] right-5 w-4 h-4 bg-white rotate-45 transform"></div>

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">Vendor Requests ({vendorRequests.length})</h3>
                <button 
                  onClick={() => setShowRequests(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {loading ? (
                <div className="text-center py-4">
                  <p>Loading requests...</p>
                </div>
              ) : vendorRequests.length === 0 ? (
                <div className="text-center py-4">
                  <p>No pending vendor requests</p>
                </div>
              ) : (
                vendorRequests.map((vendor) => (
                  <div key={vendor._id} className="bg-white rounded-lg p-3 border mb-3 last:mb-0 shadow-sm">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                        {vendor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{vendor.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{vendor.role}</p>
                        <p className="text-xs text-gray-500">{vendor.city}</p>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-2">
                      <button
                        onClick={() => handleApprove(vendor._id)}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vendor._id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div 
          className="flex items-center cursor-pointer hover:bg-gray-100 rounded-lg p-1 transition-colors"
          onClick={handleProfileClick}
        >
          <div className="mr-2 text-right hidden sm:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            AU
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;