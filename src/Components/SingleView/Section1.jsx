import React from 'react';
import image1 from '../../assets/image1.jpg'
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

export default function PropertyListing() {
    return (
        <div className="w-full p-5 max-w-full mx-auto bg-white rounded-lg overflow-hidden shadow-md">
            {/* Property Image with Favorite Button */}
            <div className="relative">
                <img
                    src={image1}
                    alt="Modern house with glass facade"
                    className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="p-1 bg-white bg-opacity-75 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="p-1 bg-white bg-opacity-75 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Property Details Container */}
            <div className="p-6">
                <div className="container mx-auto">
                    <div className="lg:flex lg:justify-between">
                        {/* Left Column: Title, Location, Type and Price */}
                        <div className="lg:w-1/2">
                            {/* Title and Location */}
                            <h2 className="text-2xl font-semibold text-indigo-900">2 BHK @ Kerala</h2>

                            <div className="flex items-center mt-3 text-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Palakkad, Kerala</span>
                            </div>

                            <div className="flex items-center mt-2 text-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Single Family Residency</span>
                            </div>

                            {/* Price */}
                            <div className="mt-4 text-2xl font-bold text-indigo-900">₹ 24,00,00</div>

                            {/* Compare Button */}
                            <button className="mt-4 px-6 py-2 border border-indigo-900 text-indigo-900 rounded hover:bg-indigo-50 transition-colors">
                                Compare
                            </button>
                        </div>

                        {/* Right Column: Three rows of content */}
                        <div className="lg:w-1/2 mt-6 lg:mt-0">
                            {/* Row 1: Property Features (Bedrooms, Bathrooms, Sqft) */}
                            <div className="flex justify-end mb-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                            <span className="text-xl font-bold text-indigo-900">4</span>
                                            <FaBed className="h-6 w-6 ml-1 text-indigo-900" />
                                        </div>
                                        <span className="text-sm text-indigo-900">Bedrooms</span>
                                    </div>


                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                            <span className="text-xl font-bold text-indigo-900">2</span>
                                            <FaBath className="h-6 w-6 ml-1 text-indigo-900" />
                                        </div>
                                        <span className="text-sm text-indigo-900">Bathrooms</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center">
                                            <span className="text-xl font-bold text-indigo-900">254</span>
                                            <FaRulerCombined className="h-6 w-6 ml-1 text-indigo-900" />
                                        </div>
                                        <span className="text-sm text-indigo-900">Sqft</span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Year Built */}
                            <div className="flex justify-end mb-6">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-indigo-900">Built in 2003</span>
                                </div>
                            </div>

                            {/* Row 3: Google Maps Button */}
                            <div className="flex justify-end">
                                <button className="px-6 py-3 bg-indigo-900 text-white rounded-md flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Open on google maps
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}