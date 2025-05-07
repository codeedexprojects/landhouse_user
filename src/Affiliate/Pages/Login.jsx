import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../../assets/LoginHalf.png";
import { sendLoginOTP, sendRegisterOTP, verifyLoginOTP, verifyRegisterOTP } from '../../services/allApi/affiliateAllApi';

export default function AffiliateAuth() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [step, setStep] = useState('form'); // 'form' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    role: 'Affiliate',
    otp: Array(6).fill('')
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData(prev => ({ ...prev, otp: newOtp }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (mode === 'register' && step === 'form') {
        const response = await sendRegisterOTP({
          name: formData.name,
          number: formData.number,
          role: formData.role
        });
        console.log('Register OTP sent:', response);
        setStep('otp');
      } 
      else if (mode === 'register' && step === 'otp') {
        const response = await verifyRegisterOTP({
          number: formData.number,
          otp: formData.otp.join('')
        });
        
        console.log('Register OTP verification response:', response);
        
        // Check various possible success indicators
        if (response && (response.success || response.status === 'success' || response.token)) {
          // Save auth token if present
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
          
          // Use timeout to ensure UI updates before navigation
          setTimeout(() => {
            navigate('/affiliate/dashboard');
          }, 100);
        } else {
          setError(response?.message || 'Verification failed');
        }
      }
      else if (mode === 'login' && step === 'form') {
        const response = await sendLoginOTP({ number: formData.number });
        console.log('Login OTP sent:', response);
        setStep('otp');
      }
      else if (mode === 'login' && step === 'otp') {
        const response = await verifyLoginOTP({
          number: formData.number,
          otp: formData.otp.join('')
        });
        
        console.log('Login OTP verification response:', response);
        
        // Enhanced success check with multiple conditions
        if (response && (
            response.success === true || 
            response.status === 'success' || 
            response.token ||
            (response.data && response.data.token)
          )) {
              // Extract token and affiliate safely
              const token = response.token || (response.data && response.data.token);
              const affiliate = response.affiliate || (response.data && response.data.affiliate);
          
              if (token) {
                localStorage.setItem('affiliateToken', token);
              }
              if (affiliate && affiliate.id) {
                localStorage.setItem('affiliateId', affiliate.id);
              }
          
              setTimeout(() => {
                console.log('Navigating to dashboard...');
                navigate('/affiliate/dashboard', { replace: true });
              }, 100);
          }
          else {
          setError(response?.message || 'Login verification failed');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err?.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Background Image with logo and text */}
      <div
        className="relative hidden md:flex md:w-1/2 bg-cover bg-center flex-col items-center justify-between text-white p-8"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="z-10 text-center w-full mt-8">
          <h2 className="italic text-2xl mb-8">Welcome To!</h2>
          <div className="bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4">
            <div className="text-blue-500">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 1.618l6 4.5V20h-2v-6H8v6H6V9.118l6-4.5z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-wider mt-2">LANDOUSE</h1>
        </div>

        <div className="z-10 text-center mb-8 px-4">
          <p className="text-sm">
            Your trusted partner in finding the perfect home, land, or investment property.
            Explore a wide range of listings, connect with verified agents, and make
            confident real estate decisions — all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
            {step === 'otp' ? 'Verify OTP' : mode === 'login' ? 'Login' : 'Register'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 'form' ? (
              <>
                {mode === 'register' && (
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                )}

                <input
                  type="tel"
                  name="number"
                  placeholder="Phone Number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full p-4 bg-blue-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  pattern="[0-9]{10}"
                  required
                />

                {mode === 'register' && (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-4 bg-blue-50 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  >
                    <option value="Affiliate">Affiliate</option>
                    <option value="Broker">Broker</option>
                    <option value="Employee">Employee</option>
                  </select>
                )}

                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    id="agreeToTerms"
                    className="mt-1"
                    required
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 text-xs text-gray-600">
                    By registering your details you agree with our terms & conditions, privacy policy, and cookie policy.
                  </label>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  We have sent you an SMS on <span className="font-semibold">+91 {formData.number.slice(-4).padStart(formData.number.length-4, '*')}</span> 
                  with a 6-digit verification code.
                </p>

                <div className="flex justify-between mb-6">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={formData.otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                      required
                    />
                  ))}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-4 bg-blue-400 text-white font-medium rounded-md hover:bg-blue-500 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === 'otp' ? 'Verifying...' : 'Sending OTP...'}
                </span>
              ) : (
                step === 'otp' ? 'Verify' : 'Continue'
              )}
            </button>

            <p className="text-center mt-4 text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => {
                      setMode('register');
                      setStep('form');
                      setError('');
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => {
                      setMode('login');
                      setStep('form');
                      setError('');
                    }}
                    className="text-blue-500 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>

            {step === 'otp' && (
              <p className="text-center mt-2 text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button 
                  type="button" 
                  onClick={async () => {
                    try {
                      setLoading(true);
                      if (mode === 'login') {
                        await sendLoginOTP({ number: formData.number });
                      } else {
                        await sendRegisterOTP({
                          name: formData.name,
                          number: formData.number,
                          role: formData.role
                        });
                      }
                    } catch (err) {
                      setError(err.message || 'Failed to resend OTP');
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="text-blue-500 hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}