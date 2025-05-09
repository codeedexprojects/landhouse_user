import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import VendorHeader from '../Components/HeaderVendor';
import VendorDashboard from '../Components/Dashboard/OverView';
import AddPropertyVendor from './AddPropertyVendor';
import PropertyDetailsVendor from './PropertyDetailsVendor';
import PropertyVendor from './PropertyVendor';
import EnquireVendor from './EnquireVendor';
import ProfileVendor from './ProfileVendor';
import EditpropertyVendor from './EditpropertyVendor';

function MainVendorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 check auth
  const vendorId = localStorage.getItem("vendorId");
  const vendorToken = localStorage.getItem("vendorToken");

  if (!vendorId || !vendorToken) {
    return <Navigate to="/vendor/login" replace />;
  }

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
        <VendorHeader toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/vendor/dashboard" />} />
            <Route path="/dashboard" element={<VendorDashboard />} />
            <Route path="/add-prop-vendor" element={<AddPropertyVendor />} />
            <Route path="/prop-details-vendor" element={<PropertyDetailsVendor />} />
            <Route path="/prop-vendor" element={<PropertyVendor />} />
            <Route path="/enquire" element={<EnquireVendor />} />
            <Route path="/profile" element={<ProfileVendor />} />
            <Route path="/edit-vendor" element={<EditpropertyVendor />} />
            <Route path="*" element={<Navigate to="/vendor/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainVendorDashboard;
