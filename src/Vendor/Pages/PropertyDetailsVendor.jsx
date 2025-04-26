import React from 'react'
import propertyCard from "/src/assets/properImage.png";
import { IoLocation } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBed, FaBath } from "react-icons/fa";
import { BsSquare } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineDeleteOutline, MdOutlinePhoneInTalk } from "react-icons/md";


function PropertyDetailsVendor() {
  return (
   <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="bg-white p-3 rounded-md shadow-sm mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span>property</span>
            <span className="mx-2">/</span>
            <span className="">propertylist</span>
            <span className="mx-2">/</span>
            <span className="text-blue-500">propertyDetails</span>
            
            <div className="ml-auto">
              <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
                <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
        {/* Property Card */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white">
          {/* Property Image */}
          <div className="w-full">
            <img
              src={propertyCard}
              alt="Property"
              className="w-full h-64 object-cover"
            />
          </div>
  
          {/* Property Details */}
          <div className="p-6">
            {/* Title and Buttons */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-blue-900">
                2 BHK @ Kerala
              </h2>
              <div className="flex gap-2">
                <button className="bg-blue-400 text-white px-4 py-1 rounded-md text-sm">
                  Sold out
                </button>
                <button className="p-2 bg-gray-200 rounded-md text-gray-600">
                  <MdOutlineDeleteOutline size={20} />
                </button>
              </div>
            </div>
  
            {/* Location */}
            <div className="flex items-center gap-2 mb-2 text-gray-700">
              <IoLocation className="text-blue-900" size={20} />
              <p>Palakkad, Kerala</p>
            </div>
            <div className="flex justify-end">
              <a
                href="#"
                className="flex items-center gap-2 text-sm py-2 px-4 rounded bg-blue-200 text-blue-600 font-medium"
              >
                Open on Google Maps
              </a>
            </div>
  
            {/* Property Type */}
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <AiFillHome className="text-blue-900" size={20} />
              <p>Single Family Residency</p>
            </div>
  
            {/* Price */}
            <div className="text-right mb-4">
              <p className="text-2xl font-bold text-blue-900">₹ 24,00,00/-</p>
            </div>
  
            {/* Features */}
            <div className="flex flex-wrap justify-between gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FaBed className="text-blue-500" size={18} />
                <span className="text-sm">4 Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-blue-500" size={18} />
                <span className="text-sm">2 Bathrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <BsSquare className="text-blue-500" size={18} />
                <span className="text-sm">254 sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <BiTimeFive className="text-blue-500" size={18} />
                <span className="text-sm">Built in 2003</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Private Notes Section */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Private Notes*</h3>
          <div className="flex bg-blue-50 rounded-xl overflow-hidden">
            {/* Left column - Labels */}
            <div className="w-1/3 p-4 space-y-2 rounded-xl gap-6">
              <p className="font-bold text-blue-900">Owner Name</p>
              <p className="font-bold text-blue-900">Contact Number</p>
              <p className="font-bold text-blue-900">Notes</p>
            </div>
  
            {/* Right column - Values */}
            <div className="w-2/3 p-4 space-y-2 rounded-xl">
              <p>Prithviraj</p>
              <p>0466224628</p>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>
            </div>
          </div>
        </div>
  
        {/* Description Section */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            The house, built in 2003, is a charming single-story residence with a
            classic design. Featuring a spacious living room, a cozy kitchen, and
            three well-lit bedrooms, it provides a comfortable living space. The
            exterior boasts a traditional brick façade with a neatly landscaped
            front yard. Large windows allow ample natural light, while the
            backyard offers a serene retreat with a small patio. The house has
            been well-maintained over the years, preserving its original character
            while incorporating modern conveniences.
          </p>
        </div>
  
        {/* Overview Section */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Overview</h3>
          <div className="space-y-4">
            {[
              { label: "Address", value: "Palakkad, Kerala" },
              { label: "City", value: "Palakkad" },
              { label: "State", value: "Kerala" },
              { label: "Postal Code", value: "123456" },
              { label: "What's Nearby", value: "School, Groceries" },
            ].map((item, index) => (
              <div key={index} className="flex border-t pt-2 text-gray-700">
                <div className="w-1/3 font-medium">{item.label}</div>
                <div className="w-2/3 text-blue-700">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Latest Enquiry Section */}
        <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
          <h2 className="text-2xl font-bold text-[#0B0B45] mb-6">
            Latest Enquiry
          </h2>
  
          {/* Header */}
          <div className="grid grid-cols-6 font-semibold text-gray-600 py-2 border-b">
            <h6>Sl No</h6>
            <h6>Name</h6>
            <h6>Phone</h6>
            <h6>Email</h6>
            <h6>Message</h6>
            <h6>Action</h6>
          </div>
  
          {/* Row */}
          <div className="grid grid-cols-6 items-center text-gray-700 py-4 border-b">
            <p>01</p>
            <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">Praveen TP</span>
          </div>
            <p>+91 98745 65476</p>
            <p>praveentp@gmail.com</p>
            <p className="text-blue-500 cursor-pointer">View message</p>
            <div className="text-xl text-blue-500 cursor-pointer">
              <MdOutlinePhoneInTalk />
            </div>
          </div>
        </div>
      </div>
  )
}

export default PropertyDetailsVendor
