import React from "react";
import { FiHeart, FiPlusCircle, FiXCircle } from "react-icons/fi";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const CompareListings = () => {
  return (
    <div>
        <Header></Header>
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
          <div className="w-full max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#131A5A]">
              Compare Listings
            </h2>
    
            {/* Property 1 */}
            <div className="border border-blue-300 rounded-lg p-4 flex items-center gap-4 mb-6">
              <div className="w-32 h-24 rounded-md overflow-hidden">
                <img
                  src="/path-to-house1.jpg"
                  alt="House 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-[#131A5A]">
                  Single Family Residency, 4 Cent
                </h3>
                <p className="text-gray-600">Palakkad, Kerala, India</p>
                <p className="text-gray-600">House</p>
                <p className="font-semibold text-[#131A5A] mt-1">₹ 24,00,00</p>
              </div>
              <FiHeart className="text-blue-400 text-xl" />
            </div>
    
            {/* Property 2 - Empty state with Add Button */}
            <div className="border border-blue-300 rounded-lg p-4 flex items-center justify-between">
              <p className="text-gray-500">Add another property to compare</p>
              <button className="flex items-center gap-2 text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition">
                <FiPlusCircle />
                <span>Add</span>
              </button>
            </div>
    
            {/* Action Buttons */}
            <div className="flex justify-center mt-8 gap-4">
              <button className="bg-[#131A5A] text-white px-6 py-2 rounded hover:bg-[#0f154a] transition">
                Compare
              </button>
              <button className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition">
                Close
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default CompareListings;
