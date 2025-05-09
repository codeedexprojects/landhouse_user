import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AffiliateHeader from '../Components/HeaderVendor';
import Sidebar from '../Components/Sidebar';
import AffiliateDashboard from '../Components/Dashboard/OverView';

function PrivateRoute({ children }) {
  const affiliateId = localStorage.getItem('affiliateId'); // Check if affiliateId is in localStorage
  
  // If no affiliateId, redirect to login page
  if (!affiliateId) {
    return <Navigate to="/affiliate/login" />;
  }

  return children; // If affiliateId exists, render the route content
}

function MainAffiliateDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AffiliateHeader toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/affiliate/dashboard" />} />
            
            {/* Private Route for Dashboard */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <AffiliateDashboard />
                </PrivateRoute>
              } 
            />
            
            {/* Redirects to login if no affiliateId */}
            <Route path="*" element={<Navigate to="/affiliate/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainAffiliateDashboard;
