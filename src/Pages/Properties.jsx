import React, { useEffect } from 'react';
import house1 from '/src/assets/house1.jpg'
import house2 from '/src/assets/house2.jpg'
import house3 from '/src/assets/house3.jpg'
import house4 from '/src/assets/house4.jpg'
import house5 from '/src/assets/house5.jpg'
import house6 from '/src/assets/house6.jpg'
import house7 from '/src/assets/house7.jpg'
import house8 from '/src/assets/house8.jpg'
import house9 from '/src/assets/house9.jpg'
import { MdLocationOn } from "react-icons/md";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


const properties = [
  {
    id: 1,
    image: house1,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 2,
    image: house2,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 3,
    image: house3,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 4,
    image: house4,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 5,
    image: house5,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 6,
    image: house6,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 7,
    image: house7,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 8,
    image: house8,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
  {
    id: 9,
    image: house9,
    title: 'Single Family Residency 4 BHK',
    beds: 4,
    baths: 3,
    sqft: 2500,
    location: 'Kochi',
  },
];

const Properties = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const navigate = useNavigate()
  const handleViewClick = () => {
    navigate('/single')
  }
  return (
    <div>
      <Header></Header>
      <div className="px-4 py-8 md:px-12 lg:px-24 bg-white overflow-x-hidden">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
          Login to unlock <br />
          <span className="text-600">property prices !</span>
        </h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search City, Pincode, Address"
          className="w-[300px] px-4 py-3 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Price Dropdown */}
        <div className="w-40 mb-8">
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border rounded-lg shadow-sm overflow-hidden w-full max-w-[360px] mx-auto"
              style={{ border: "1px solid white", borderRadius: "2px", backgroundColor: "#E7F1FF" }}
            >
              {/* Image */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-36 object-cover"
              />

              {/* Details */}
              <div className="p-3 space-y-2">
                <h2 className="text-sm font-semibold text-gray-700">{property.title}</h2> {/* was text-xs */}
                <div className="text-sm text-gray-500 flex flex-wrap gap-1"> {/* was text-xs */}
                  <span>{property.beds} Beds</span> |
                  <span>{property.baths} Baths</span> |
                  <span>{property.sqft} sqft</span>
                </div>
                <p className="text-sm text-gray-400 flex items-center gap-1"> {/* was text-xs */}
                  <MdLocationOn className="text-base text-gray-400" />
                  {property.location}
                </p>
                {/* Right-aligned button */}
                <div className="flex justify-end">
                  <button onClick={handleViewClick} className="px-3 py-1 bg-[#5A85BFB2] text-white text-sm rounded hover:bg-indigo-700"> {/* text-sm */}
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer></Footer>
    </div>
  );
};

export default Properties;
