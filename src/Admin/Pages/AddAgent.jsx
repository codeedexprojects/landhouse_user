import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { addVendor } from '../../services/allApi/adminAllApis';

export default function AddAgentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: '',  // No default role
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      name: formData.name,
      number: formData.phone,    // phone → number
      role: formData.role,
      city: formData.location    // location → city
    };

    try {
      const response = await addVendor(reqBody);
      console.log('Vendor added:', response.data);
      alert('Vendor added successfully!');
      // Optionally, reset form:
      setFormData({
        name: '',
        phone: '',
        role: '', // Clear the role field
        location: ''
      });
    } catch (error) {
      console.error('Error adding vendor:', error);
      alert('Failed to add vendor. Check console for details.');
    }
  };

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>property</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">Add agent</span>

          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img src="/api/placeholder/32/32" alt="User profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-md shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-medium">Add Agent</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Agent Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Agent name</label>
              <input
                type="text"
                name="name"
                placeholder="Subramanyan"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="9089898794"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a role</option> {/* No default role */}
                  <option value="Broker">Broker</option>
                  <option value="Employee">Employee</option>
                  <option value="Developer">Developer</option>
                  <option value="Builder">Builder</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                placeholder="Palakkad"
                className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-blue-400 text-white px-16 py-3 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
