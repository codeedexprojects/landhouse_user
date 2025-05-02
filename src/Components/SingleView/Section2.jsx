import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProperty, sendEnquiry } from '../../services/allApi/userAllApi';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await getSingleProperty(propertyId);
        setProperty(propertyData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('User not logged in.');
      return;
    }

    const enquiryPayload = {
      userId,
      propertyId,
      ...formData,
    };

    try {
      await sendEnquiry(userId, enquiryPayload);
      setSuccessMessage('Enquiry sent successfully!');
      setFormData({ name: '', phoneNumber: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send enquiry.');
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  if (!property) return <div className="p-10 text-center">Property not found</div>;

  const addressParts = property.address.split(',');
  const street = addressParts[0]?.trim();
  const city = addressParts[1]?.trim();
  const state = addressParts[2]?.trim();

  return (
    <div className="p-10 bg-white text-[#0c0c2c] space-y-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-6">Overview</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Address</span>
              <span className="text-[#6b6b8d]">{street}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">City</span>
              <span className="text-[#6b6b8d]">{city}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">State</span>
              <span className="text-[#6b6b8d]">{state}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Postal Code</span>
              <span className="text-[#6b6b8d]">{property.zipcode}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">What's Nearby</span>
              <span className="text-[#6b6b8d]">{property.whats_nearby}</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2">
          <h2 className="text-lg font-semibold mb-6">Ask About This Property</h2>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Type your message here"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded p-2 outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-sm md:text-base">
        <h2 className="text-lg font-semibold mb-4">Description</h2>
        <p className="text-[#2c2c51] leading-relaxed">
          {property.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
