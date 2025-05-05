import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { getEnquireis } from '../../services/allApi/adminAllApis';
import { Toast } from '../../Components/Toast';

export default function MessageList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquireis();
        if (response && response.data && response.data.enquiries) {
          setEnquiries(response.data.enquiries);
        } else {
          setToast({ message: 'Failed to load enquiries.', type: 'error' });
        }
      } catch (error) {
        console.error(error);
        setToast({ message: 'Error fetching enquiries.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Messages</span>
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Message table card */}
      <div className="bg-white rounded-md shadow-sm mb-6 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 p-4 border-b">
          <div className="font-medium">Name</div>
          <div className="font-medium">Phone number / E-mail</div>
          <div className="font-medium">Enquired Property</div>
          <div className="font-medium">Message</div>
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No enquiries found.</div>
        ) : (
          enquiries.map((enquiry) => (
            <div key={enquiry._id} className="grid grid-cols-4 gap-2 p-4 border-b">
              <div className="text-gray-500">
                {enquiry.name || `${enquiry.userId.firstName} ${enquiry.userId.lastName}`}
              </div>
              <div className="text-gray-500">
                {enquiry.phoneNumber} / {enquiry.email}
              </div>
              <div className="text-blue-500">
                {enquiry.propertyId ? enquiry.propertyId.address : 'No property'}
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 truncate max-w-[150px]">{enquiry.message}</span>
                <a href="#" className="text-blue-400 ml-1">read more...</a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination (static for now) */}
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
