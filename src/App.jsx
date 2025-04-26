import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Properties from './Pages/Properties'
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/favorites" element={<Collections />} />
        <Route path="/single" element={<SingleView />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LandouseLoginForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/compare" element={<CompareListings />} />
        <Route path="/compare-result" element={<ComparePropertiesResult />} />
        <Route path="/invite" element={<InvitePage />} />


        {/* Admin Panel */}
        <Route path="/admin/*" element={<MainDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Vendor Panle */}
        <Route path="/vendor/*" element={<MainVendorDashboard />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/otp" element={<VerifyNumber />} />
        <Route path="/vendor/approval" element={<WaitingApproval />} />
        <Route path="/vendor/access-granted" element={<AccessGranted />} />
        <Route path="/vendor/access-declined" element={<AccessDeclined />} />

      </Routes>
    </>
  )
}

export default App
