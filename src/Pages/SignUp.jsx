import { useEffect, useState } from 'react';
import { Mail, User, Phone, Lock } from 'lucide-react';
import image1 from "../assets/Sign up.png";
import { useLocation, useNavigate } from 'react-router-dom';
import { sendRegistrationOTP, verifyRegistrationOTP, resendOTP } from '../services/allApi/userAllApi';
import { Toast } from '../Components/Toast';

export default function LandouseSignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    invitationCode: '',
    otp: '',
    agreeToTerms: false,
  });

  const [step, setStep] = useState(1); // 1 = form, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [toast, setToast] = useState({ message: '', type: '' });
  const referralCode = queryParams.get('referralCode');
  const productId = queryParams.get('productId');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const referralCode = localStorage.getItem('referralId');

    if (userId && token && referralCode) {
      navigate(productId ? `/single/${productId}` : '/');
    }
  }, [location, navigate, productId]);

  useEffect(() => {
    if (referralCode) {
      setFormData(prev => ({ ...prev, invitationCode: referralCode }));
    }
  }, [referralCode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      setToast({ message: 'Please agree to the Terms & Conditions.', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      await sendRegistrationOTP(formData.phoneNumber);
      setStep(2);
      setToast({ message: 'OTP sent successfully!', type: 'success' });
      setTimeout(() => setCanResend(true), 30000);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await resendOTP(formData.phoneNumber, 'registration');
      setToast({ message: 'OTP resent successfully!', type: 'success' });
      setCanResend(false);
      setTimeout(() => setCanResend(true), 30000);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await verifyRegistrationOTP(formData, formData.otp);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('referralId', data.referralCode);
      setToast({ message: data.message, type: 'success' });

      setTimeout(() => {
        navigate(productId ? `/single/${productId}` : '/');
      }, 1500);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 overflow-auto">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '' })}
        />
      )}
      <div className="relative w-full min-h-screen">
        <div className="fixed inset-0 z-0">
          <img src={image1} alt="Modern luxury home" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 p-6 md:p-12 lg:p-16 flex justify-center lg:justify-start">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl py-8">
            <h1 className="text-4xl font-bold text-black mb-2">Create Your <br /> Landouse <br /> Account</h1>
            <p className="text-black/90 mb-8">View prices, save your favorite properties, and more.</p>

            <div className="mb-6">
              <p className="text-black mb-1">
                Already A Member?
                <a href="/login" className="ml-2 text-white font-medium hover:underline">Log in</a>
              </p>
            </div>

            <form onSubmit={step === 1 ? handleSendOTP : handleCompleteRegistration} className="w-full">
              {step === 1 ? (
                <>
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

                  <div className="mb-4 relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email (Optional)"
                      className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                    />
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-white/70" />
                  </div>

                  <div className="mb-4 relative">
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Address (Optional)"
                      className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                    />
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-white/70" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        name="invitationCode"
                        value={formData.invitationCode}
                        onChange={handleChange}
                        placeholder="Invitation Code (Optional)"
                        className="w-full p-3 pl-4 pr-10 bg-black/20 backdrop-blur-sm border border-white/30 rounded text-white placeholder-white/70"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-blue-600 font-medium p-3 rounded hover:bg-blue-50 transition duration-200"
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-white text-sm">
                      I agree with your <a href="#" className="underline">Terms & Conditions</a>
                    </label>
                  </div>
                </>
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-blue-600 font-medium p-3 rounded hover:bg-blue-50 transition duration-200 mb-4"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Register'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-white font-medium p-3 rounded hover:underline"
                  >
                    Back to Form
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}