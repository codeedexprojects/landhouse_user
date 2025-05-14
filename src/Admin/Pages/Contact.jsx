import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Download, Check } from "lucide-react";
import { contactUsAPI } from "../../services/allApi/adminAllApis";


function Contact() {

const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactUsAPI();
        setContacts(data); // Assuming API returns an array
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* <div className="max-w-6xl mx-auto"> */}
      {/* Header */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-blue-500">Messages</span>
          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-sm shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="border-b border-black-200">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">
                Phone alphabet / E-mail
              </th>
              <th className="px-6 py-3 font-semibold">Message</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
   <tbody>
  {loading ? (
    <tr>
      <td colSpan="4" className="text-center py-4">Loading...</td>
    </tr>
  ) : contacts.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-4 text-gray-400">No messages found.</td>
    </tr>
  ) : (
    contacts.map((contact) => (
      <tr key={contact._id} className="border-b border-gray-200">
        <td className="px-6 py-4">{contact.name}</td>
        <td className="px-6 py-4">{contact.number} / {contact.mail}</td>
        <td className="px-6 py-4 text-gray-600">{contact.message}</td>
        <td className="px-6 py-4 text-green-600 font-medium flex items-center gap-1">
          <span className="inline-flex items-center text-green-500">
            <Check className="w-4 h-4 mr-1" /> Read
          </span>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between mt-6">
        <button className="flex items-center text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm">
          <Download className="mr-2 w-4 h-4" />
          Download
        </button>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-black">←</button>
          <span className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</span>
          <button className="text-gray-500 hover:text-black">→</button>
          <select className="ml-4 border rounded px-2 py-1">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Contact;
