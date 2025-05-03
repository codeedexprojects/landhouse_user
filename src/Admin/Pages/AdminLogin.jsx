import React, { useState } from 'react';
import image from "../../assets/AdminLogin.jpg";
import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../../services/allApi/adminAllApis';


export default function AdminLoginPage() {
const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await AdminLogin(loginData.email, loginData.password);
      localStorage.setItem('admintoken', data.token);
      localStorage.setItem('adminId', data.admin.id);
      setSuccess('Successfully logged in!');
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-6xl flex bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left side with image */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center p-10">
          <img
            src={image}
            alt="Admin login visual"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Right side with login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
            <p className="text-gray-600 text-sm mb-6">
              Secure access to the admin panel using your registered email.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Having trouble logging in? </span>
              <a href="#" className="text-blue-500 hover:underline">Get help</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
