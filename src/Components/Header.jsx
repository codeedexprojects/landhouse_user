import React, { useState } from 'react';
import { FiHome, FiInfo, FiPhone, FiMap } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Helper function to check if the current link is active
  const isActive = (path) => location.pathname === path ? 'text-blue-500 font-semibold' : 'text-gray-900 hover:text-gray-700';

  return (
    <>
      <header className={`${isHome ? 'bg-transparent' : 'bg-white shadow-sm'} relative z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src={logo} alt="Company Logo" className="h-8 w-auto" />
              </a>
            </div>

            {/* Desktop Nav (hidden on mobile) */}
            <nav className="hidden md:flex items-center space-x-20 ml-auto">
              <a href="/" className={`font-medium ${isActive('/')}`}>Home</a>
              <a href="/properties" className={`font-medium ${isActive('/properties')}`}>Properties</a>
              <a href="/about" className={`font-medium ${isActive('/about')}`}>About Us</a>
              <a href="/contact" className={`font-medium ${isActive('/contact')}`}>Contact</a>
            </nav>

            {/* Menu Toggle (only visible on desktop) */}
            <button
              onClick={toggleSidebar}
              className="text-gray-800 hover:text-gray-600 focus:outline-none ml-10"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar (optional toggle) */}
        {isOpen && (
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black opacity-30" onClick={toggleSidebar} />
            <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col justify-between pb-13">
              <div className="p-4 space-y-4 overflow-y-auto">
                <a href="/compare" className="block text-gray-800 border-b py-2">Compare</a>
                <a href="/favorites" className="block text-gray-800 border-b py-2">Favorites</a>
                <a href="/invite" className="block text-gray-800 border-b py-2">Invite Friends</a>
                <a href="/profile" className="block text-gray-800 border-b py-2">Profile</a>
              </div>
              <div className="p-4 border-t">
                <button onClick={() => alert('Logging out...')} className="w-full text-left text-gray-800">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom Navigation (only mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-inner md:hidden flex justify-around items-center py-2 z-50">
        <a href="/" className="flex flex-col items-center text-blue-500">
          <FiHome className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </a>
        <a href="/properties" className="flex flex-col items-center text-blue-500">
          <FiMap className="h-6 w-6" />
          <span className="text-xs mt-1">Properties</span>
        </a>
        <a href="/about" className="flex flex-col items-center text-blue-500">
          <FiInfo className="h-6 w-6" />
          <span className="text-xs mt-1">About Us</span>
        </a>
        <a href="/contact" className="flex flex-col items-center text-blue-500">
          <FiPhone className="h-6 w-6" />
          <span className="text-xs mt-1">Contact</span>
        </a>
      </nav>
    </>
  );
}
