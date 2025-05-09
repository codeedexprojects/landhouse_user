import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, X, LogIn, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  approveVendor,
  getVendors,
  rejectVendor,
  approveAffiliate,
  getAffiliateRequest,
  getEnquiryCounts
} from '../../services/allApi/adminAllApis';

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showRequests, setShowRequests] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [vendorRequests, setVendorRequests] = useState([]);
  const [affiliateRequests, setAffiliateRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('vendors'); // 'vendors' or 'affiliates'
  const dropdownRef = useRef(null);
  const loginDropdownRef = useRef(null);
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    const fetchCount = async () => {
      const data = await getEnquiryCounts();
      if (data && data.unreadCount !== undefined) {
        setUnreadCount(data.unreadCount);
      }
    };

    fetchCount();
  }, []);

  // Fetch all pending requests
  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        setLoading(true);

        // Fetch vendor requests
        const vendorResponse = await getVendors();
        const vendors = Array.isArray(vendorResponse?.data) ? vendorResponse.data : [];
        const pendingVendors = vendors.filter(vendor => !vendor.approvalStatus);
        setVendorRequests(pendingVendors);

        // Fetch affiliate requests
        const affiliateResponse = await getAffiliateRequest();
        const pendingAffiliates = affiliateResponse?.approvalRequests || [];
        setAffiliateRequests(pendingAffiliates);

        // Calculate total requests
        setTotalRequests(pendingVendors.length + pendingAffiliates.length);

      } catch (error) {
        console.error('Error fetching requests:', error.message);
        setVendorRequests([]);
        setAffiliateRequests([]);
        setTotalRequests(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRequests(); // Call the function to fetch data immediately
  }, []); 

  // Handle vendor approval
  const handleApproveVendor = async (vendorId) => {
    try {
      await approveVendor(vendorId);
      setVendorRequests(prev => prev.filter(v => v._id !== vendorId));
    } catch (error) {
      console.error('Vendor approval failed:', error.message);
    }
  };

  // Handle vendor rejection
  const handleRejectVendor = async (vendorId) => {
    try {
      await rejectVendor(vendorId);
      setVendorRequests(prev => prev.filter(v => v._id !== vendorId));
    } catch (error) {
      console.error('Vendor rejection failed:', error.message);
    }
  };

  // Handle affiliate approval
  const handleApproveAffiliate = async (affiliateId) => {
    try {
      await approveAffiliate(affiliateId);
      setAffiliateRequests(prev => prev.filter(a => a._id !== affiliateId));
    } catch (error) {
      console.error('Affiliate approval failed:', error.message);
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
      fetchAllRequests();
    }
  };

  const handleLoginClick = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const handleLoginVendor = () => {
    navigate('/vendor/login');
    setShowLoginDropdown(false);
  };

  const handleLoginAffiliate = () => {
    navigate('/affiliate/login');
    setShowLoginDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRequests(false);
      }
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate total pending requests
  // const totalRequests = vendorRequests.length + affiliateRequests.length;

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
        {/* Login Dropdown */}
        <div className="relative" ref={loginDropdownRef}>
          <button
            className="flex items-center p-2 text-blue-500 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors"
            onClick={handleLoginClick}
          >
            <LogIn size={20} className="mr-1" />
            <span className="hidden sm:inline">Login</span>
            <ChevronDown size={16} className="ml-1" />
          </button>

          {showLoginDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl p-2 z-30">
              <div className="absolute top-[-10px] right-5 w-4 h-4 bg-white rotate-45 transform"></div>
              <button
                onClick={handleLoginVendor}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M20 7h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"></path>
                  <path d="M9 4h6v3H9z"></path>
                </svg>
                Vendor Dashboard
              </button>
              <button
                onClick={handleLoginAffiliate}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Affiliate Dashboard
              </button>
            </div>
          )}
        </div>

        <button
          className="relative p-2 text-blue-500 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors"
          onClick={handleMessageClick}
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Requests Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-2 bg-blue-100 text-blue-500 rounded-lg cursor-pointer hover:bg-blue-200 transition-colors relative"
            onClick={handleRequestsClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            {totalRequests > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalRequests}
              </span>
            )}
          </button>

          {showRequests && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl p-4 z-30 max-h-96 overflow-y-auto">
              <div className="absolute top-[-10px] right-5 w-4 h-4 bg-white rotate-45 transform"></div>

              <div className="flex justify-between items-center mb-2">
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'vendors' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('vendors')}
                  >
                    Vendors ({vendorRequests.length})
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${activeTab === 'affiliates' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('affiliates')}
                  >
                    Affiliates ({affiliateRequests.length})
                  </button>
                </div>
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
              ) : (
                <>
                  {activeTab === 'vendors' ? (
                    vendorRequests.length === 0 ? (
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
                              onClick={() => handleApproveVendor(vendor._id)}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1 rounded-lg transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectVendor(vendor._id)}
                              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded-lg transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    affiliateRequests.length === 0 ? (
                      <div className="text-center py-4">
                        <p>No pending affiliate requests</p>
                      </div>
                    ) : (
                      affiliateRequests.map((affiliate) => (
                        <div key={affiliate._id} className="bg-white rounded-lg p-3 border mb-3 last:mb-0 shadow-sm">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                              {affiliate.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{affiliate.name}</p>
                              <p className="text-xs text-gray-500">Affiliate</p>
                              <p className="text-xs text-gray-500">{affiliate.number}</p>
                            </div>
                          </div>
                          <div className="flex justify-between space-x-2">
                            <button
                              onClick={() => handleApproveAffiliate(affiliate._id)}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1 rounded-lg transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm py-1 rounded-lg transition-colors"
                              disabled
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))
                    )
                  )}
                </>
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