import React, { useState } from 'react';
import { FiHome, FiInfo, FiPhone, FiMap } from 'react-icons/fi';
import logo from '../assets/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="bg-white shadow-sm relative">
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

              <a href="/" className="text-gray-900 hover:text-gray-700 font-medium">Home</a>
              <a href="/properties" className="text-gray-900 hover:text-gray-700 font-medium">Properties</a>
              <a href="/about" className="text-gray-900 hover:text-gray-700 font-medium">About Us</a>
              <a href="/contact" className="text-gray-900 hover:text-gray-700 font-medium">Contact</a>
            </nav>

            {/* Menu Toggle (only visible on desktop) */}
            <button
              onClick={toggleSidebar}
              className="text-gray-800 hover:text-gray-600 focus:outline-none ml-10 "
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner md:hidden flex justify-around items-center py-2 z-50">
        <a href="/" className="flex flex-col items-center text-gray-700">
          <FiHome className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </a>
        <a href="/properties" className="flex flex-col items-center text-gray-700">
          <FiMap className="h-5 w-5" />
          <span className="text-xs">Properties</span>
        </a>
        <a href="/about" className="flex flex-col items-center text-gray-700">
          <FiInfo className="h-5 w-5" />
          <span className="text-xs">About</span>
        </a>
        <a href="/contact" className="flex flex-col items-center text-gray-700">
          <FiPhone className="h-5 w-5" />
          <span className="text-xs">Contact</span>
        </a>
      </nav>
    </>
  );
}
