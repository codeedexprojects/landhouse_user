import React from "react";
import image from "../assets/image4.jpg"
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const CompareProperties = () => {
  return (
    <div>
        <Header></Header>
        <div className="min-h-screen px-4 py-10 flex justify-center bg-white">
          <div className="w-full max-w-6xl">
            <h2 className="text-3xl font-bold text-[#131A5A] mb-10">
              Compare Properties
            </h2>
    
            {/* Images on top of columns */}
            <div className="grid grid-cols-3 gap-4 items-start mb-4">
              <div></div> {/* Left spacer for title column */}
              <div className="flex justify-center">
                <img
                  src={image}
                  alt="Property 1"
                  className="h-48 w-full max-w-[300px] object-cover rounded-md"
                />
              </div>
              <div className="flex justify-center">
                <img
                  src={image}
                  alt="Property 2"
                  className="h-48 w-full max-w-[300px] object-cover rounded-md"
                />
              </div>
            </div>
    
            {/* Table with alternating colors */}
            <div className="w-full border border-gray-300 rounded-md overflow-hidden">
              {[
                ["Title", "Single Family Residency, 4 Cent", "Single Family Residency, 6 Cent"],
                ["Price", "₹ 24,00,00", "₹ 34,00,00"],
                ["Sqft", "2415", "2518"],
                ["Property Type", "House", "House"],
                ["Address", "Palakkad, Kerala, India", "Palakkad, Kerala, India"],
                ["City", "Palakkad", "Palakkad"],
                ["Bedrooms", "4", "5"],
                ["Bathrooms", "2", "2"],
              ].map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-3 px-4 py-3 text-sm ${
                    idx % 2 === 0 ? "bg-[#E9F1FF]" : "bg-white"
                  }`}
                >
                  <div className="font-medium text-[#131A5A]">{row[0]}</div>
                  <div>{row[1]}</div>
                  <div>{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default CompareProperties;
