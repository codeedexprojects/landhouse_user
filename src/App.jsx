import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import SingleView from './Pages/SingleView'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import SignupForm from './Pages/SignUp'
import LandouseLoginForm from './Pages/Login'
import ProfilePage from './Pages/ProfilePage'
import CompareListings from './Pages/CompareProper'
import ComparePropertiesResult from './Pages/CompareResult'
import InvitePage from './Pages/Referral'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single" element={<SingleView />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LandouseLoginForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/compare" element={<CompareListings />} />
        <Route path="/compare-result" element={<ComparePropertiesResult />} />
        <Route path="/invite" element={<InvitePage />} />




      </Routes>
        
    </>
  )
}

export default App
