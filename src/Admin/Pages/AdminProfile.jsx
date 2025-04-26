import React from 'react';

export default function AdminProfile() {
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* Admin details header */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
         
          
          <span className="text-blue-500">Admin Profile</span>
          
          <div className="ml-auto">
            
          </div>
        </div>
      </div>
      
      {/* Profile card */}
      <div className="bg-white rounded-lg shadow-sm mb-4 p-6">
        <div className="flex items-center">
          <div className="relative">
            <img 
              src="/api/placeholder/130/130" 
              alt="Admin profile" 
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-blue-100 p-1.5 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-medium">Pathu .P</h2>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>
      </div>
      
      {/* Personal information card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First column */}
          <div>
            <p className="text-gray-500 mb-2">First Name</p>
            <p className="font-medium">Pathu</p>
          </div>
          
          {/* Second column */}
          <div>
            <p className="text-gray-500 mb-2">Last Name</p>
            <p className="font-medium">P</p>
          </div>
          
          {/* Third column */}
          <div>
            <p className="text-gray-500 mb-2">Date of Birth</p>
            <p className="font-medium">11-12-1998</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* First column */}
          <div>
            <p className="text-gray-500 mb-2">Email Address</p>
            <p className="font-medium">info@Pathulandouse.com</p>
          </div>
          
          {/* Second column */}
          <div>
            <p className="text-gray-500 mb-2">Phone Number</p>
            <p className="font-medium">+91 12345 98765</p>
          </div>
          
          {/* Third column */}
          <div>
            <p className="text-gray-500 mb-2">Address</p>
            <p className="font-medium">Palakkad</p>
          </div>
        </div>
      </div>
    </div>
  );
}