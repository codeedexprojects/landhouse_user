import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import AdminHeader from '../Components/HeaderAdmin';
import Dashboard from '../Components/Dashboard/Overview';
import AddProperty from './AddProperty';
import PropertyListingPage from './ViewProperties';
import AgentListingPage from './AllAgents';
import AddAgentForm from './AddAgent';
import UserDetailsPage from './UserDetails';
import UserList from './AllUsers';
import PropertyDetails from './PropertyDetails';
import AgentDetails from './AgentDetails';
import HomeLoanEnquiry from './HomeLoadEnq';
import ReferralAffiliates from './Referrels';
import AdminProfile from './AdminProfile';
import CreateCouponForm from './AddCoupon';
import AdminLogin from './AdminLogin';
import MessageList from './Messages';
import Affiliates from './Affiliates';
import EditProperty from './EditProperty';

function MainDashboard() {
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
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/property" element={<AddProperty />} />
            <Route path="/view-property" element={<PropertyListingPage />} />
            <Route path="/view-agent" element={<AgentListingPage />} />
            <Route path="/add-agent" element={<AddAgentForm />} />
            <Route path="/user-details/:id" element={<UserDetailsPage />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/property-details" element={<PropertyDetails />} />
            <Route path="/agent-details/:vendorId" element={<AgentDetails />} />
            <Route path="/loan-enquiry" element={<HomeLoanEnquiry />} />
            <Route path="/referrels" element={<ReferralAffiliates />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/create-coupon" element={<CreateCouponForm />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/affiliates" element={<Affiliates />} />
            <Route path="/edit-property" element={<EditProperty />} />

            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
