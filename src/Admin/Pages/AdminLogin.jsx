import React, { useState } from 'react';
import image from "../../assets/AdminLogin.jpg"

export default function AdminLogin() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempted with:', loginData);
        // Handle login logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-6xl flex overflow-hidden rounded-lg">
                {/* Left side with illustration */}
                {/* Left side with image */}
                <div className="hidden md:block w-1/2">
                    <img
                        src={image} // replace with your image path
                        alt="Admin login visual"
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* Right side with login form */}
                <div className="w-full md:w-1/2 bg-blue-50 p-8 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Secure access to the admin panel using your registered mobile number.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={loginData.username}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            <span className="text-gray-600">Having trouble logging in? </span>
                            <a href="#" className="text-blue-500 hover:underline">Get help</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}