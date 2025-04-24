import React from 'react'
import Header from '../Components/Header'
import LandouseSection from '../Components/Aboutus/Section2'
import AboutUsSection from '../Components/Aboutus/Section1'
import Footer from '../Components/Footer'

function AboutUs() {
  return (
    <div>
        <Header></Header>
        <div><AboutUsSection></AboutUsSection></div>
        <div><LandouseSection></LandouseSection></div>
        <Footer></Footer>
    </div>
  )
}

export default AboutUs