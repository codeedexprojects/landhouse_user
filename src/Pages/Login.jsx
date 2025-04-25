import { useState } from 'react';
import { Mail, User, Phone, Lock, CheckSquare } from 'lucide-react';
import image1 from "../assets/Sign up.png"

export default function LandouseLoginForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle submission logic here
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 overflow-auto">
      {/* Container with proper overflow handling */}
      <div className="relative w-full min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img 
            src={image1}
            alt="Modern luxury home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/60"></div>
        </div>
        
        {/* Form Content with proper scrolling */}
        <div className="relative z-10 p-6 md:p-12 lg:p-16 flex justify-center lg:justify-start">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl py-8">
            <h1 className="text-4xl font-bold text-black mb-2">Find Your <br /> Next Home <br /> Just Log In</h1>
            <p className="text-black/90 mb-8">Stay updated on new properties, price changes, and more..</p>
            
            <div className="mb-6">
              <p className="text-black mb-1">
                New Here ?
                <a href="#" className="ml-2 text-white font-medium hover:underline">Create your account</a>
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                    required
                  />
                  <User className="absolute right-3 top-3 h-5 w-5 text-white/70" />
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                    required
                  />
                  <User className="absolute right-3 top-3 h-5 w-5 text-white/70" />
                </div>
              </div>
              
              <div className="mb-4 relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                  required
                />
                <Phone className="absolute right-3 top-3 h-5 w-5 text-white/70" />
              </div>
              
             
              
              {/* Invitation code and submit button in same row with 50/50 split */}
              <div className="mb-4 relative">
                
                
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-medium p-3 rounded hover:bg-blue-50 transition duration-200"
                >
                  Create Account
                </button>
              </div>
              
             
              
              {/* Add bottom padding to ensure scrolling works properly */}
              <div className="h-6"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}