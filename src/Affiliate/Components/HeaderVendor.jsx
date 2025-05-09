import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AffiliateHeader = ({ toggleSidebar }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/vendor/profile');
      };
      const handleMessageClick = () => {
        navigate('/vendor/enquire');
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
        {/* <button className="p-2 text-blue-500 bg-blue-100 rounded-lg cursor-pointer" onClick={handleMessageClick}>
          <Bell size={20} />
        </button> */}
       
        <div className="flex items-center cursor-pointer" >
          <div className="mr-2 text-right hidden sm:block">
            <p className="text-sm font-medium">Affiliate</p>
            <p className="text-xs text-gray-500">Affiliate</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            AF
          </div>
        </div>
      </div>
    </header>
  );
};

export default AffiliateHeader;