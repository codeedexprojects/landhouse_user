import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ContactSection from '../Components/ContactUs/Section1'
import Footer from '../Components/Footer'
import Loader from '../Components/Loader'

function ContactUs() {
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
          <Header />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  )
}

export default ContactUs
