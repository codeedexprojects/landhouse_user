import React, { useEffect, useState } from 'react';
import { getEnquireis } from '../../services/allApi/vendorAllAPi';

function EnquireVendor() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const vendorId = localStorage.getItem('vendorId');
        if (!vendorId) return;

        const data = await getEnquireis(vendorId);
        setEnquiries(data.enquiries);
      } catch (error) {
        console.error('Failed to fetch enquiries:', error);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <div className="rounded-lg gap-6 ms-5 me-6 mt-6 overflow-hidden shadow-md bg-white p-6">
      {/* Header */}
      <div className="grid gap-8 grid-cols-6 font-semibold text-gray-600 py-2 border-b">
        <h6>Name</h6>
        <h6>Phone/Email</h6>
        <h6>Enquired Property</h6>
        <h6>Message</h6>
      </div>

      {/* Data Rows */}
      {enquiries.map((item) => (
        <div
          key={item._id}
          className="grid gap-8 grid-cols-6 items-center text-gray-700 py-4 border-b"
        >
          <span className="font-semibold">{item.name}</span>
          <p>
            {item.phoneNumber} <br /> {item.email}
          </p>
          <p>
            {item.propertyId?.property_type}, ₹{item.propertyId?.property_price}
          </p>
          <p className="text-blue-500 cursor-pointer">{item.message}</p>
        </div>
      ))}

      {enquiries.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No enquiries found.</p>
      )}
    </div>
  );
}

export default EnquireVendor;
