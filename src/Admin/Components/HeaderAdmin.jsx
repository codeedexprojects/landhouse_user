import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

const AdminHeader = ({ toggleSidebar }) => {
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
        <button className="p-2 text-blue-500 bg-blue-100 rounded-lg">
          <Bell size={20} />
        </button>
        <button className="p-2 bg-blue-100 text-blue-500 rounded-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
        <div className="flex items-center">
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