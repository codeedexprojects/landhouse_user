import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import image3 from '../../assets/image.png';
import { sendLoanEnquiry } from '../../services/allApi/userAllApi';

const HomeLoanForm = () => {
  const { propertyId } = useParams(); // get propertyId from URL

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    occupation: '',
    typeOfLoan: '',
    monthlySalary: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage('');

      const enquiryData = {
        userId: localStorage.getItem('userId'),
        propertyId, // added here
        name: formData.name,
        number: formData.number,
        occupation: formData.occupation,
        typeOfLoan: formData.typeOfLoan,
        monthlySalary: formData.monthlySalary,
      };

      await sendLoanEnquiry(enquiryData);

      setMessage('Enquiry submitted successfully!');
      setFormData({
        name: '',
        number: '',
        occupation: '',
        typeOfLoan: '',
        monthlySalary: '',
      });
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-7xl">
        <h2 className="text-xl font-semibold text-[#0c0c2c] mb-6">
          We'll Help You Find the Perfect Home Loan
        </h2>

        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          <div className="md:w-1/2 w-full md:pl-50">
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
              {/* form fields... (same as before) */}
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Phone Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Occupation</label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select occupation</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Type of Loan</label>
                <select
                  name="typeOfLoan"
                  value={formData.typeOfLoan}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                >
                  <option value="">Select loan type</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Plot Loan">Plot Loan</option>
                  <option value="Renovation Loan">Renovation Loan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#0c0c2c] mb-1">Monthly Salary</label>
                <input
                  type="number"
                  name="monthlySalary"
                  value={formData.monthlySalary}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your monthly salary"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
            </form>
          </div>

          <div className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center items-center">
            <img
              src={image3}
              alt="Home loan illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanForm;
