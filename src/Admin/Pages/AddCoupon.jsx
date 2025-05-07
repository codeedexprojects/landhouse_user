import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; 
import { addAffiliate } from '../../services/allApi/adminAllApis';

export default function CreateCouponForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    role: 'Affiliates'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    number: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      number: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.number.trim()) {
      newErrors.number = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.number)) {
      newErrors.number = 'Phone number must be 10 digits';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const apiData = {
        name: formData.name.trim(),
        number: formData.number.trim(),
        role: formData.role
      };

      const response = await addAffiliate(apiData);
      
      if (response && response.error) {
        throw new Error(response.message || 'Failed to add affiliate');
      }
      
      toast.success('Affiliate added successfully!');
      navigate('/admin/affiliates');
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to add affiliate. Please try again.';
      toast.error(errorMessage);
      
      // Handle specific backend error
      if (error.response?.data?.error?.includes('slice')) {
        toast.error('Server validation error. Please check your input.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <div className="bg-white p-3 rounded-md shadow-sm mb-6">
        <div className="text-gray-500">
          <span>Affiliates</span>
          <span className="mx-2">/</span>
          <span className="text-blue-600">add affiliates</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="space-y-4">
          {/* Name input */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter affiliate name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-4 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.name ? 'border border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Phone number input */}
          <div>
            <input
              type="tel"
              name="number"
              placeholder="Enter phone number (10 digits)"
              value={formData.number}
              onChange={handleChange}
              className={`w-full p-4 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                errors.number ? 'border border-red-500' : ''
              }`}
              maxLength="10"
            />
            {errors.number && (
              <p className="mt-1 text-sm text-red-500">{errors.number}</p>
            )}
          </div>
          
          {/* Role dropdown - Only showing Affiliates option */}
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 bg-blue-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled
            >
              <option value="Affiliates">Affiliate</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className={`w-full p-4 bg-blue-400 text-center text-white font-medium rounded-md hover:bg-blue-500 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                SUBMITTING...
              </span>
            ) : (
              'SUBMIT'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}