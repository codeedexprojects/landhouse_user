import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showRequests, setShowRequests] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    navigate('/admin/profile');
  };

  const handleMessageClick = () => {
    navigate('/admin/messages');
  };

  const handleRequestsClick = () => {
    setShowRequests(!showRequests);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowRequests(false);
      }
    }
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
        <button className="p-2 text-blue-500 bg-blue-100 rounded-lg cursor-pointer" onClick={handleMessageClick}>
          <Bell size={20} />
        </button>

        {/* Requests Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="p-2 bg-blue-100 text-blue-500 rounded-lg cursor-pointer"
            onClick={handleRequestsClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>

          {showRequests && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-4 z-30">
              {/* Little Arrow on top */}
              <div className="absolute top-[-10px] right-5 w-4 h-4 bg-white rotate-45 transform"></div>

              {/* Close Button */}
              <div className="flex justify-end mb-2">
                <button onClick={() => setShowRequests(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>

              {/* User Requests */}
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border mb-3 last:mb-0 shadow-sm">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/68.jpg"
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Smrithi Mandana</p>
                      <p className="text-xs text-gray-500">{index % 2 === 0 ? 'Employee' : 'Builder'}</p>
                    </div>
                  </div>
                  <div className="flex justify-between space-x-2">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1 rounded-lg">
                      Accept
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded-lg">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
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

export default AdminHeader;
