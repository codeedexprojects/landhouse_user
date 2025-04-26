import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import React from 'react';

export default function HomeLoanEnquiry() {
  // Sample data for the table
  const enquiryData = [
    { name: "praveen", property: "Single Family Residency, 4 Cent", occupation: "software Engineer", loanType: "Personal", salary: "50000", contact: "9969696590" },
    { name: "praveen", property: "Single Family Residency, 4 Cent", occupation: "Driver", loanType: "Home", salary: "45200", contact: "9969696590" },
    { name: "praveen", property: "Single Family Residency, 4 Cent", occupation: "software Engineer", loanType: "Personal", salary: "26540", contact: "9969696590" },
    { name: "praveen", property: "Single Family Residency, 4 Cent", occupation: "Driver", loanType: "Home", salary: "89554", contact: "9969696590" },
  ];

  return (
    <div className="bg-blue-50 min-h-screen p-4">
     
      
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
         
          
          <span className="text-blue-500">Home Loan Enquiry</span>
          
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-2 p-4 border-b">
          <div className="font-medium">Name</div>
          <div className="font-medium">Enquired Property</div>
          <div className="font-medium">occupation</div>
          <div className="font-medium">Type of loan</div>
          <div className="font-medium">Salary</div>
          <div className="font-medium">Contact number</div>
        </div>
        
        {/* Table Rows */}
        {enquiryData.map((row, index) => (
          <div key={index} className="grid grid-cols-6 gap-2 p-4 border-b">
            <div className="text-gray-500">{row.name}</div>
            <div className="text-blue-500">{row.property}</div>
            <div className="text-gray-500">{row.occupation}</div>
            <div className="text-gray-500">{row.loanType}</div>
            <div className="text-gray-500">{row.salary}</div>
            <div className="bg-green-100 text-green-800 rounded px-2 py-1">{row.contact}</div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>

        <div className="flex items-center">
          <button className="p-2 text-gray-500">
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex space-x-2 mx-2">
            <button className="w-8 h-8 rounded-md bg-blue-500 text-white flex items-center justify-center text-sm">1</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">2</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">3</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">4</button>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">5</button>
            <span className="flex items-center justify-center text-gray-500">...</span>
            <button className="w-8 h-8 rounded-md bg-white text-gray-500 flex items-center justify-center text-sm shadow-sm">19</button>
          </div>

          <button className="p-2 text-gray-500">
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="ml-4 flex items-center border-l border-gray-200 pl-4">
            <button className="w-8 h-8 rounded-md bg-white text-gray-600 flex items-center justify-center text-sm shadow-sm">10</button>
          </div>
        </div>
      </div>
    </div>
  );
}