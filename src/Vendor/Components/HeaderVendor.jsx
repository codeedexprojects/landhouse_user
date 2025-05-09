import React, { useEffect, useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getVendorEnquiryCounts } from '../../services/allApi/vendorAllAPi';

const VendorHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [unreadEnquiries, setUnreadEnquiries] = useState(0);

  const vendorId = localStorage.getItem('vendorId'); // ✅ fetch vendorId from localStorage

  const fetchEnquiryCounts = async () => {
    try {
      const data = await getVendorEnquiryCounts(vendorId);
      if (data?.success) {
        setUnreadEnquiries(data.unreadEnquiries);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchEnquiryCounts();
      const interval = setInterval(fetchEnquiryCounts, 60000); // refresh every 60 seconds
      return () => clearInterval(interval);
    }
  }, [vendorId]); // rerun if vendorId changes (safety)

  const handleProfileClick = () => {
    navigate('/vendor/profile');
  };

  const handleMessageClick = () => {
    navigate('/vendor/enquire');
    setUnreadEnquiries(0); // optionally reset count when viewing
  };

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4">
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
        <div className="relative">
          <button
            className="p-2 text-blue-500 bg-blue-100 rounded-lg cursor-pointer relative"
            onClick={handleMessageClick}
          >
            <Bell size={20} />
            {unreadEnquiries > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                {unreadEnquiries}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center cursor-pointer" onClick={handleProfileClick}>
          <div className="mr-2 text-right hidden sm:block">
            <p className="text-sm font-medium">Pathu P</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500"
          />
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
