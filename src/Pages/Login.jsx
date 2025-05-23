import { useState } from 'react';
import { Phone } from 'lucide-react';
import image1 from "../assets/Sign up.png";
import { sendLoginOTP, verifyLoginOTP, resendOTP } from '../services/allApi/userAllApi';
import { useNavigate } from 'react-router-dom';

export default function LandouseLoginForm() {
  const [formData, setFormData] = useState({ 
    phoneNumber: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // 1 = phone input, 2 = OTP input
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await sendLoginOTP(formData.phoneNumber);
      setStep(2);
      setSuccess('OTP sent successfully!');
      
      // Enable resend button after 30 seconds
      setTimeout(() => setCanResend(true), 30000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await verifyLoginOTP(formData.phoneNumber, formData.otp);
      
      // Save required data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user._id);
      localStorage.setItem('referralId', data.user.referralId);

      setSuccess('Login successful!');
      navigate('/properties');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    
    try {
      await resendOTP(formData.phoneNumber, 'login');
      setSuccess('OTP resent successfully!');
      setCanResend(false);
      
      // Enable resend button after 30 seconds
      setTimeout(() => setCanResend(true), 30000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 overflow-auto">
      <div className="relative w-full min-h-screen">
        <div className="fixed inset-0 z-0">
          <img src={image1} alt="Modern luxury home" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 p-6 md:p-12 lg:p-16 flex justify-center lg:justify-start">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl py-8">
            <h1 className="text-4xl font-bold text-black mb-2">Find Your <br /> Next Home <br /> Just Log In</h1>
            <p className="text-black/90 mb-8">Stay updated on new properties, price changes, and more..</p>

            <div className="mb-6">
              <p className="text-black mb-1">
                Don't have an account ?
                <a href="/register" className="ml-2 text-white font-medium hover:underline">Create Account</a>
              </p>
            </div>
            
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <form onSubmit={step === 1 ? handleSendOTP : handleVerifyOTP} className="w-full">
              {step === 1 ? (
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
              ) : (
                <>
                  <div className="mb-4 relative">
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP"
                      className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                      required
                    />
                    <p className="text-white text-sm mt-1">OTP sent to {formData.phoneNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={!canResend || loading}
                    className="text-white text-sm mb-4 hover:underline disabled:opacity-50"
                  >
                    Didn't receive OTP? Resend
                  </button>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-blue-600 font-medium p-3 rounded hover:bg-blue-50 transition duration-200"
              >
                {loading ? 'Processing...' : step === 1 ? 'Send OTP' : 'Verify OTP'}
              </button>

              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full mt-2 text-white font-medium p-3 rounded hover:underline"
                >
                  Change Phone Number
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}