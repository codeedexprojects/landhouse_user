import React, { useState } from 'react';
import image from "../../assets/LoginHalf.png";
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp } from '../../services/allApi/vendorAllAPi';
import image2 from "../../assets/logo.png"

export default function VendorLogin() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    role: '',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.number || !formData.role) {
      setError('Phone number and role are required');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      setLoading(true);
      await sendOtp(formData.number, formData.role);
      navigate('/vendor/otp', {
        state: {
          number: formData.number,
          role: formData.role
        }
      });
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Background Image with logo and text */}
      <div
        className="relative hidden md:flex md:w-1/2 bg-cover bg-center flex-col items-center justify-between text-white p-8"
        style={{
          backgroundImage: `url(${image})`

        }}
      >
        {/* Top welcome text */}
        <div className="z-10 text-center w-full mt-8">
          <h2 className="italic text-2xl mb-8">Welcome To!</h2>

          {/* Logo circle */}
          <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <img
              src={image2}
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>


          {/* Brand name */}
          <h1 className="text-3xl font-bold tracking-wider mt-2">LANDOUSE</h1>
        </div>

        {/* Bottom description text */}
        <div className="z-10 text-center mb-8 px-4">
          <p className="text-sm">
            Your trusted partner in finding the perfect home, land, or investment property.
            Explore a wide range of listings, connect with verified agents, and make
            confident real estate decisions — all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">Login</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <input
                type="tel"
                name="number"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-4 bg-blue-50 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="" disabled>Select your Role</option>
                <option value="Broker">Broker</option>
                <option value="Employee">Employee</option>
                <option value="Developer">Developer</option>
                <option value="Builder">Builder</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-600">
                By registering your details you agree with our terms & conditions, privacy policy, and cookie policy.
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-4 bg-blue-400 text-white font-medium rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Continue'}
              </button>
            </div>
            <p className="text-sm">
              Don’t have an account?{' '}
              <Link
                to="/vendor/register"
                className="text-blue-500 hover:underline"
              >
                Please register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
