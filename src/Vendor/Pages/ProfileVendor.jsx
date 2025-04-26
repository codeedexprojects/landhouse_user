import React from 'react'

function ProfileVendor() {
  return (
    <div className="min-h-screen bg-blue-50 p-4 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header with emoji and name */}
        <div className="mb-4">
          <h1 className="text-xl text-blue-500 font-medium flex items-center">
            <span className="mr-2"></span> Hey Alexander Hipp,
          </h1>
        </div>
        
        {/* Phone number verification */}
        <div className="mb-6 relative">
          <div className="bg-blue-100 rounded-md p-3 pr-10 relative">
            <span className="text-gray-700">verified phone number : 9989898978</span>
            <button className="absolute right-3 top-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Section title */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-800">Add Additional Information</h2>
        </div>
        
        {/* Main content with flex layout for form and image */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Form fields - taking most of the space */}
          <div className="flex-1 space-y-3">
            {/* Role selection */}
            <div className="relative">
              <div className="bg-blue-100 rounded-md p-3 pr-10 flex justify-between items-center">
                <span className="text-gray-700">Choose your Role</span>
                <button className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Email field */}
            <div className="relative">
              <div className="bg-blue-100 rounded-md p-3 pr-10 relative">
                <span className="text-gray-700">Enter your E-mail</span>
                <button className="absolute right-3 top-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Post code field - highlighted with border */}
            <div className="relative">
              <div className="bg-blue-100 rounded-md p-3 pr-10 relative">
                <span className="text-gray-700">Enter your postcode</span>
                <button className="absolute right-3 top-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* City field with dimensions */}
            <div className="relative">
              <div className="bg-blue-100 rounded-md p-3 pr-10 relative">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Enter your city</span>
                  <div className="flex items-center">
                    <button className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* About profession textarea */}
            <div className="relative">
              <div className="bg-blue-100 rounded-md p-3 pr-10 relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">About your profession</span>
                  <button className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
                <div className="h-32"></div> {/* Empty space for text area */}
              </div>
            </div>
          </div>
          
          {/* Image upload box - on the right side */}
          <div className="md:mt-0 mt-4">
  <div className="bg-gray-200 rounded-md w-32 h-32 flex items-center justify-center overflow-hidden">
    <img 
      src="your-image-url-here.jpg" 
      alt="Uploaded" 
      className="object-cover w-full h-full" 
    />
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileVendor
