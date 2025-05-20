import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Collections from './Pages/Collections'
import SingleView from './Pages/SingleView'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import SignupForm from './Pages/SignUp'
import LandouseLoginForm from './Pages/Login'
import ProfilePage from './Pages/ProfilePage'
import CompareListings from './Pages/CompareProper'
import ComparePropertiesResult from './Pages/CompareResult'
import InvitePage from './Pages/Referral'
import MainDashboard from './Admin/Pages/Dashboard'
import AdminLogin from './Admin/Pages/AdminLogin'
import MainVendorDashboard from './Vendor/Pages/Dashboard'
import VendorLogin from './Vendor/Pages/VendorLogin'
import VerifyNumber from './Vendor/Pages/VerifyOTP'
import WaitingApproval from './Vendor/Pages/WaitingApprovel'
import AccessGranted from './Vendor/Pages/AccessGranted'
import AccessDeclined from './Vendor/Pages/AccessDeclined'
import VendorRegister from './Vendor/Pages/vendorRegister'
import MainAffiliateDashboard from './Affiliate/Pages/Dashboard'
import AffiliateLogin from './Affiliate/Pages/Login'
import VerifyAffiliateNumber from './Affiliate/Pages/VerifyOTP'
import AffiliateRegister from './Affiliate/Pages/Register'
import Properties from './Pages/Properties'

function App() {
  // ✅ define PrivateRoute inside App component
  const PrivateRoute = ({ children }) => {
    const userId = localStorage.getItem('userId');
    return userId ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<SignupForm />} />
        <Route path="/login" element={<LandouseLoginForm />} />

        {/* 🔒 PRIVATE ROUTES */}
        <Route 
          path="/favorites" 
          element={
            <PrivateRoute>
              <Collections />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/single/:propertyId" 
          element={
            <PrivateRoute>
              <SingleView />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/compare" 
          element={
            <PrivateRoute>
              <CompareListings />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/compare-result" 
          element={
            <PrivateRoute>
              <ComparePropertiesResult />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/invite" 
          element={
            <PrivateRoute>
              <InvitePage />
            </PrivateRoute>
          } 
        />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<MainDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Vendor Panel */}
        <Route path="/vendor/*" element={<MainVendorDashboard />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/otp" element={<VerifyNumber />} />
        <Route path="/vendor/approval" element={<WaitingApproval />} />
        <Route path="/vendor/access-granted" element={<AccessGranted />} />
        <Route path="/vendor/access-declined" element={<AccessDeclined />} />

        {/* Affiliate Panel */}
        <Route path="/affiliate/*" element={<MainAffiliateDashboard />} />
        <Route path="/affiliate/login" element={<AffiliateLogin />} />
        <Route path="/affiliate/otp" element={<VerifyAffiliateNumber />} />
        <Route path="/affiliate/register" element={<AffiliateRegister />} />
      </Routes>
    </>
  )
}

export default App
