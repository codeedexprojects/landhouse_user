import React, { useState } from 'react';
import image from "../../assets/AdminLogin.jpg";

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
                            Secure access to the admin panel using your registered mobile number.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={loginData.username}
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
