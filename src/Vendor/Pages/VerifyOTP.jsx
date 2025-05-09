import React, { useState } from 'react';
import image from "../../assets/LoginHalf.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtpForLogin, verifyRegistrationOtp, sendOtp, sendOtpForRegistration } from '../../services/allApi/vendorAllAPi';

export default function VerifyNumber() {
  const location = useLocation();
  const { number, role, registrationData, type = 'login' } = location.state || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect if missing required data
  React.useEffect(() => {
    if (type === 'login' && (!number || !role)) {
      navigate('/vendor/login');
    } else if (type === 'registration' && !registrationData) {
      navigate('/vendor/register');
    }
  }, [number, role, registrationData, type, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      setError('');

      let response;
      if (type === 'registration') {
        // Handle registration verification
        response = await verifyRegistrationOtp(
          registrationData.number, 
          otpCode
        );
        
        if (response.message === 'Vendor registered successfully. Awaiting admin approval.') {
          navigate('/vendor/approval', {
            state: { message: response.message }
          });
        } else {
          navigate('/vendor/dashboard');
        }
      } else {
        // Handle login verification
        response = await verifyOtpForLogin(number, role, otpCode);
        
        if (response.message === 'Vendor not approved by admin') {
          navigate('/vendor/approval');
        } else {
          // Store vendor data in localStorage for successful login
          if (response.token && response.vendorId) {
            localStorage.setItem('vendorToken', response.token);
            localStorage.setItem('vendorId', response.vendorId);
          }
          navigate('/vendor/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (type === 'registration') {
        await sendOtpForRegistration(registrationData);
      } else {
        await sendOtp(number, role);
      }
      
      alert('OTP resent successfully!');
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick=()=>{
    navigate('/vendor/login')
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Background Image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center flex-col justify-between items-center text-white p-8"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="text-center mt-12">
          <h2 className="italic text-2xl mb-8">Welcome To !</h2>

          <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <div className="text-blue-500">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 1.618l6 4.5V20h-2v-6H8v6H6V9.118l6-4.5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-wider mt-2">LANDOUSE</h1>
        </div>

        <div className="text-center mb-8 px-6">
          <p className="text-sm">
            Your trusted partner in finding the perfect home, land, or investment property.
            Explore a wide range of listings, connect with verified agents, and make
            confident real estate decisions — all in one place.
          </p>
        </div>
      </div>

      {/* Right Side - Verify Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
            {type === 'registration' ? 'Complete Registration' : 'Verify Your Number'}
          </h2>
          
          <p className="text-gray-600 text-center md:text-left mb-6">
            We have sent you an SMS on <span className="font-semibold">+91 {type === 'registration' ? registrationData?.number : number}</span> 
            with a 6-digit verification code.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* OTP Boxes */}
          <div className="flex justify-between mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
                disabled={loading}
                className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full p-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>

          {/* Resend */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button 
              onClick={handleResend} 
              disabled={loading}
              className="text-blue-500 hover:underline disabled:opacity-50"
            >
              Re-send
            </button>
          </p>
          <p className="text-center mt-6 text-sm text-gray-600">
            Try Login Again ! 
            <button 
             onClick={handleLoginClick}
              disabled={loading}
              className="text-blue-500 hover:underline disabled:opacity-50"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}