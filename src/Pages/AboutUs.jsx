import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import LandouseSection from '../Components/Aboutus/Section2'
import AboutUsSection from '../Components/Aboutus/Section1'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'

function AboutUs() {
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 1500) // 1.5 seconds
  
      return () => clearTimeout(timer)
    }, [])
  
  return (
    <div>
       {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
        <Header></Header>
        <div><AboutUsSection></AboutUsSection></div>
        <div><LandouseSection></LandouseSection></div>
        <Footer></Footer>
        </>
        )}
    </div>
  )
}

export default AboutUs