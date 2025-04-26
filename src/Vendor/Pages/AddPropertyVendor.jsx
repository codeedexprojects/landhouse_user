import React from 'react'

function AddPropertyVendor() {
  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h1 className="text-xl font-semibold mb-4">Add Property</h1>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <input 
                type="text" 
                placeholder="Office, Apartment, House" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          
          {/* Property Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Price</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="₹ 4500000/" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
            <input 
              type="text" 
              placeholder="2000 sq ft" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* What's nearby */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What's nearby</label>
            <input 
              type="text" 
              placeholder="School, Hospital, House" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Build in */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Build in</label>
            <input 
              type="text" 
              placeholder="2002" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Cent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cent</label>
            <input 
              type="text" 
              placeholder="Palakkad" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Max Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Rooms</label>
            <input 
              type="text" 
              placeholder="5" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Beds */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
            <input 
              type="text" 
              placeholder="5" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Baths */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Baths</label>
            <input 
              type="text" 
              placeholder="3" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            rows="4" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input 
              type="text" 
              placeholder="Address of your property" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Zip code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip code</label>
            <input 
              type="text" 
              placeholder="Add your pincode" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Location mark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location mark</label>
            <div className="border border-gray-300 rounded-md h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
              <img 
                src="/api/placeholder/400/160" 
                alt="Map placeholder" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                <span className="text-blue-600 font-medium">Choose Property location</span>
              </div>
            </div>
          </div>
          
          {/* Coordinates */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">Coordinates</label>
            <div className="flex items-center mb-2">
              <span className="text-gray-500 mr-4">or</span>
            </div>
            <input 
              type="text" 
              placeholder="Add your longitude" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <input 
              type="text" 
              placeholder="Add your latitude" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <div className="border border-gray-300 rounded-md h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
              <img 
                src="/api/placeholder/400/160" 
                alt="Map placeholder" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                <h4 className="text-blue-600 font-medium">Drop file here or click to upload</h4>
              </div>
            </div>
          </div>
          
          {/* Coordinates */}
          <div className="flex flex-col ">
            <label className="block text-sm font-medium text-gray-700 mt-8"></label>
            
            <input 
              type="text" 
              placeholder="Add more photo" 
              className="w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <input 
              type="text" 
              placeholder="Add more photo" 
              className="w-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="text" 
              placeholder="Add more photo" 
              className=" w-[200px] px-3 py-2 mt-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           
          </div>
        </div>
        <div className="text">
  <h3>Private notes*</h3>
  <input 
    type="text" 
    placeholder="Heading" 
    className="w-full px-3 py-2 border bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
  />
  <input 
    type="text" 
    placeholder="Title" 
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  
  <div className="flex justify-center items-center mt-4">
    <button className="button bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300">Add More</button>
  </div>
</div>

      </div>
    </div>
  )
}

export default AddPropertyVendor
