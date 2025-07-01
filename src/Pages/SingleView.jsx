import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Components/Header'
import PropertyListing from '../Components/SingleView/Section1'
import PropertyInquiryForm from '../Components/SingleView/Section2'
import HomeLoanForm from '../Components/SingleView/Section3'
import Footer from '../Components/Footer'

function SingleView() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromProperties) {
      sessionStorage.setItem('shouldRestoreScroll', 'true');
    }
    window.scrollTo(0, 0);
    return () => {
    };
  }, [location.state]);

  return (
    <div>
      <Header />
      <div><PropertyListing /></div>
      <div><PropertyInquiryForm /></div>
      <div><HomeLoanForm /></div>
      <Footer />
    </div>
  )
}

export default SingleView