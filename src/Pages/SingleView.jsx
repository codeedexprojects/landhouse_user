import React from 'react'
import Header from '../Components/Header'
import PropertyListing from '../Components/SingleView/Section1'
import PropertyInquiryForm from '../Components/SingleView/Section2'
import HomeLoanForm from '../Components/SingleView/Section3'
import Footer from '../Components/Footer'

function SingleView() {
  return (
    <div>
        <Header></Header>
        <div><PropertyListing></PropertyListing></div>
        <div><PropertyInquiryForm></PropertyInquiryForm></div>
        <div><HomeLoanForm></HomeLoanForm></div>
        <Footer></Footer>
    </div>
  )
}

export default SingleView