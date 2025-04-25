import React from 'react'
import { FaBed, FaBath } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { GiResize } from 'react-icons/gi';
import { CiHeart } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci"; 
import home from '/src/assets/Home.png'
import home1 from '/src/assets/smallhome1.jpg'
import home2 from '/src/assets/smallhome2.jpg'
import home3 from '/src/assets/smallhome3.jpg'
import home4 from '/src/assets/smallhome4.jpg'
import person1 from '/src/assets/person1.jpg'
import person2 from '/src/assets/person2.jpg'
import person3 from '/src/assets/person3.jpg'
import person4 from '/src/assets/person4.jpg'
import bgimage from '/src/assets/bgimage.jpg'
import Rimage from '/src/assets/roundimage.png'
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const properties = [
  {
    id: 1,
    image: '/src/assets/house1.jpg',
    title: 'Single Family Residency, 4 Cent',
    location: 'Palakkad, Kerala',
    beds: 4,
    baths: 2,
    sqft: 2541,
  },
  {
    id: 2,
    image: '/src/assets/house2.jpg',
    title: 'Single Family Residency, 6 Cent',
    location: 'Palakkad, Kerala',
    beds: 4,
    baths: 2,
    sqft: 2541,
  },
  {
    id: 3,
    image: '/src/assets/house3.jpg',
    title: 'Single Family Residency, 4 Cent',
    location: 'Palakkad, Kerala',
    beds: 4,
    baths: 2,
    sqft: 2541,
  },
];

function Home() {
  const navigate = useNavigate()
  const handleShow=()=>{
    navigate("/properties")
  }
  
  return (
    <div>
      <Header></Header>
      <div className=" bg-white">
        {/* Banner */}
        <div className="relative w-full h-[650px] mb-12 rounded-xl overflow-hidden">
          {/* Background Image */}
          <img src={home} alt="Banner" className="w-full h-full object-cover" />
  
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-opacity-40 flex items-center px-8 md:px-16">
            <div className="text-[#3A7EDD] max-w-md mt-52">
              <h2 className="text-3xl md:text-4xl font-bold mt-5">
                Invest In Your Future Today
              </h2>
              <p className="text-sm md:text-base mb-5 mt-5">
                Discover Profitable properties with expert guidance
              </p>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded shadow hover:from-indigo-600 hover:to-purple-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
  
        {/* Properties Section Heading */}
        <div className=" mb-8 ms-5">
          <h3 className="text-2xl font-bold  mb-1 text-gray-800">Best Properties available</h3>
          <p className="text-gray-600 text-sm">Each property design has it's own meaning and we ready to help you to got a property according to our taster . </p>
        </div>
  
        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  justify-center">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-[#EAF2FF] rounded-lg overflow-hidden shadow-sm w-full max-w-[360px] mx-auto"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#EAF2FF] text-xs text-gray-600 font-semibold px-2 py-1 rounded">
                  Price: $250,000
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="text-gray-600"><CiHeart /></button>
                  <button className="text-gray-600"><CiShare2 /></button>
                </div>
              </div>
  
              <div className="p-4">
                <h2 className="text-sm font-medium text-gray-700">{property.title}</h2>
  
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MdLocationOn className="mr-1 text-sm text-indigo-500" />
                  {property.location}
                </div>
  
                <div className="flex justify-between text-[11px] text-gray-500 mt-3">
                  <div className="flex items-center gap-1">
                    <FaBed className="text-sm text-gray-700" />
                    {property.beds} <span className="text-[10px] text-gray-400">Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBath className="text-sm text-gray-700" />
                    {property.baths} <span className="text-[10px] text-gray-400">Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GiResize className="text-sm text-gray-700" />
                    {property.sqft} <span className="text-[10px] text-gray-400">Sqft</span>
                  </div>
                </div>
  
                <div className="flex justify-end mt-4">
                  <button className="px-4 py-1 bg-[#5A85BFB2] text-white text-xs rounded hover:bg-[#3b5e89]">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border-[#000000b2] text-gray-700 bg-[#5A85BFB2] rounded-sm text-[white]" onClick={handleShow}>
            SHOW MORE
          </button>
        </div>
        <div className="bg-blue-50 min-h-screen mt-5">
          {/* Top Section */}
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-8">
              {/* Who we are section */}
              <div className="md:w-1/2">
                <h1 className="text-4xl font-bold text-indigo-900 mb-6">Who we are ?</h1>
                <p className="text-gray-800 mb-8">
                  We offer a range of servicing including buying selling and property Management
                </p>
                
                <div className="flex gap-12 mt-6">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-blue-500">80+</h2>
                    <p className="text-blue-800">Premium houses</p>
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-blue-500">500+</h2>
                    <p className="text-blue-800">Agent Houses</p>
                  </div>
                  
                  <div className="text-center">
                    <h2 className="text-5xl font-bold text-blue-500">3K</h2>
                    <p className="text-blue-800">Happy client</p>
                  </div>
                </div>
              </div>
              
              {/* Images grid */}
              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden">
                  <img src={home1} alt="House with porch" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src={home2} alt="White house with porch" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img src={home3} alt="Red roof house" className="w-full h-full object-cover" />
                </div>
                <div className="relative">
                  <img src={home4} alt="Modern architecture" className="w-full h-3/4 object-cover" />
                  <div className="flex justify-center mt-2">
                    <div className="flex -space-x-4">
                      <img src={person1} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={person2} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={person3} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={person4}alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Bottom Section - Light Blue Background */}
          <div className="relative w-full h-auto py-16 px-6">
            {/* Background Image */}
            <img 
              src={bgimage}
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover z-0" 
            />
  
            {/* Light Blue Overlay */}
            <div className="absolute inset-0 bg-blue-300/30 backdrop-blur-md z-10"></div>
  
            {/* Content */}
            <div className="relative z-20 max-w-6xl mx-auto text-indigo-900">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                
                {/* Why Landouse Section */}
                <div className="md:w-1/2 text-[#03004D]">
                  <h2 className="text-4xl font-bold mb-6">Why Landouse is Your Best Choice</h2>
                  <p className="leading-relaxed">
                    Finding the perfect property can be overwhelming, but Landouse makes the journey seamless and stress-free. Our secure platform offers transparency, convenience, and personalized features that help you make informed decisions with confidence.
                  </p>
                </div>
  
                {/* Features Cards */}
                <div className="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Trusted Agency Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                    <div className="bg-indigo-900 p-2 rounded-full mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Trusted Agency</h3>
                    <p className="text-sm text-gray-600">
                      Safe and reliable property-buying experience by listing only verified properties from trusted sellers.
                    </p>
                  </div>
  
                  {/* Legal Documentation Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                    <div className="bg-indigo-900 p-2 rounded-full mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Legal & Documentation Support</h3>
                    <p className="text-sm text-gray-600">
                      Property transactions with verified legal assistance.
                    </p>
                  </div>
  
                  {/* Loan Assistance Card */}
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center col-span-1 md:col-span-2">
                    <div className="bg-indigo-900 p-2 rounded-full mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Loan Assistance</h3>
                    <p className="text-sm text-gray-600">
                      Get expert guidance on loan options and financing for your dream property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 w-full flex items-center justify-center py-16 px-4">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
            
            {/* Left side content */}
            <div className="md:w-1/2 p-4 md:p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Get Your Dream Property
              </h1>
              <p className="text-gray-700 mb-8 max-w-md">
                Discover the ideal property that suits your needs and lifestyle. Start your journey to the perfect home today!
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded transition duration-300">
                Contact Now
              </button>
            </div>
  
            {/* Right side image section */}
            <div className="md:w-1/2 p-4 md:p-0 mt-8 md:mt-0 relative flex justify-center">
              <div className="w-72 h-72 rounded-full bg-blue-100/50 border-8 border-white/20 p-2 relative flex items-center justify-center">
                {/* Blue circular rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-2"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-4"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-6"></div>
  
                {/* Image */}
                <img 
                  src={Rimage} 
                  alt="Modern dream home" 
                  className="w-64 h-64 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home