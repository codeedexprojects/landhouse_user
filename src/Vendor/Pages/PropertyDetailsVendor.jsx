import React, { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBed, FaBath } from "react-icons/fa";
import { BsSquare } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineDeleteOutline, MdOutlinePhoneInTalk } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Edit } from "lucide-react";
import { deletePropertyvendorAPI, vendorSoldOutAPI } from "../../services/allApi/vendorAllAPi";

function PropertyDetailsVendor() {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;
console.log(property);

  useEffect(() => {
    if (!property) {
      navigate("/vendor/prop-vendor");
    }
  }, [property, navigate]);

  if (!property) return null;

  const addressParts = property?.address?.split(",").map((part) => part.trim());
  const [street, city, state] = addressParts || [];

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const [showSoldOutModal, setShowSoldOutModal] = useState(false);

  const handleSoldOutConfirmation = async () => {
     try {
       const newSoldOutStatus = !property.soldOut;
       await vendorSoldOutAPI(property._id, newSoldOutStatus);
       property.soldOut = newSoldOutStatus;
 
       toast.success(
         newSoldOutStatus
           ? "Property marked as Sold Out!"
           : "Property is now available!"
       );
       setShowSoldOutModal(false);
     } catch (error) {
       toast.error("Failed to update property status.");
       setShowSoldOutModal(false);
     }
   };

  const confirmDelete = async () => {
    try {
      const response = await deletePropertyvendorAPI(selectedPropertyId);
      if (response.status === 200) {
        toast.success("Item deleted successfully!");
        setShowConfirmModal(false);
        setTimeout(() => {
          navigate("/vendor/prop-vendor");
        }, 2000);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setShowConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setSelectedPropertyId(null);
    setShowConfirmModal(false);
  };

  const handleEdit = (property) => {
    navigate("/vendor/edit-vendor", { state: { property } });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <div className="bg-white p-3 rounded-md shadow-sm mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <span>property</span>
          <span className="mx-2">/</span>
          <span className="">propertylist</span>
          <span className="mx-2">/</span>
          <span className="text-blue-500">propertyDetails</span>

          <div className="ml-auto">
            <div className="bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center overflow-hidden">
              <img
                src="/api/placeholder/32/32"
                alt="User profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Card */}
      <div className="rounded-lg overflow-hidden shadow-md bg-white">
        <div className="w-full">
          <img
            src={
              property.photos &&
              `http://localhost:3005/${property.photos[0]}`
            }
            alt="Property"
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-indigo-900">
              {property.beds} BHK @ {city}
            </h2>

            <div className="flex gap-2">
            <button
                onClick={() => setShowSoldOutModal(true)}
                className={`px-4 py-1 rounded-md text-sm ${
                  property?.soldOut
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {property?.soldOut ? "Mark as Available" : "Mark as Sold Out"}
              </button>
              <button
                onClick={() => {
                  setSelectedPropertyId(property?._id);
                  setShowConfirmModal(true);
                }}
                className="p-2 bg-gray-200 rounded-md text-gray-600 cursor-pointer"
              >
                <MdOutlineDeleteOutline size={20} />
              </button>
              <button
                onClick={() => handleEdit(property)}
                className="p-2 bg-gray-200 rounded-md text-gray-600 cursor-pointer"
              >
                <Edit size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2 text-gray-700">
            <IoLocation className="text-blue-900" size={20} />
            <p>{property?.address}</p>
          </div>
          <div className="flex justify-end">
            <div className="w-fit">
              <a
                href={`https://www.google.com/maps?q=${property?.coordinates?.latitude},${property?.coordinates?.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm py-2 px-3 rounded bg-blue-200 text-blue-600 font-medium whitespace-nowrap"
              >
                Open on Google Maps
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 text-gray-700">
            <AiFillHome className="text-blue-900" size={20} />
            <p>{property?.property_type}</p>
          </div>

          <div className="text-right mb-4">
            <p className="text-2xl font-bold text-blue-900">
              {property?.property_price}
            </p>
          </div>

          <div className="flex flex-wrap justify-between gap-4 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <FaBed className="text-blue-500" size={18} />
              <span className="text-sm">{property?.beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-blue-500" size={18} />
              <span className="text-sm">{property?.baths}</span>
            </div>
            <div className="flex items-center gap-2">
              <BsSquare className="text-blue-500" size={18} />
              <span className="text-sm">{property?.area} sqft</span>
            </div>
            <div className="flex items-center gap-2">
              <BiTimeFive className="text-blue-500" size={18} />
              <span className="text-sm">{property.buildIn}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Private Notes */}
      <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Private Notes*</h3>
        <div className="flex bg-blue-50 rounded-xl overflow-hidden">
          <div className="w-1/3 p-4 space-y-2 rounded-xl">
            <p className="font-bold text-blue-900">Heading</p>
            <p className="font-bold text-blue-900">Title</p>
          </div>
          <div className="w-2/3 p-4 space-y-2 rounded-xl">
            <p className="text-gray-800">
              {property?.private_note?.heading || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              {property?.private_note?.title || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {property?.description}
        </p>
      </div>

      {/* Overview */}
      <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Overview</h3>
        <div className="space-y-4">
          {[
            { label: "Address", value: street },
            { label: "City", value: city },
            { label: "State", value: state },
            { label: "Postal Code", value: property?.zipcode },
            { label: "What's Nearby", value: property?.whats_nearby },
          ].map((item, index) => (
            <div key={index} className="flex border-t pt-2 text-gray-700">
              <div className="w-1/3 font-medium">{item.label}</div>
              <div className="w-2/3 text-blue-700">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Enquiry */}
      <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
        <h2 className="text-2xl font-bold text-[#0B0B45] mb-6">
          Latest Enquiry
        </h2>
        <div className="grid grid-cols-6 font-semibold text-gray-600 py-2 border-b">
          <h6>Sl No</h6>
          <h6>Name</h6>
          <h6>Phone</h6>
          <h6>Email</h6>
          <h6>Message</h6>
          <h6>Action</h6>
        </div>
        <div className="grid grid-cols-6 items-center text-gray-700 py-4 border-b">
          <p>01</p>
          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">Praveen TP</span>
          </div>
          <p>+91 98745 65476</p>
          <p>praveentp@gmail.com</p>
          <p className="text-blue-500 cursor-pointer">View message</p>
          <div className="text-xl text-blue-500 cursor-pointer">
            <MdOutlinePhoneInTalk />
          </div>
        </div>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4 text-blue-900">
              Are you sure?
            </h2>
            <p className="text-gray-700 mb-6">
              Do you want to delete this property?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{showSoldOutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-bold mb-4 text-blue-900">
              {property?.soldOut ? "Mark as Available" : "Mark as Sold Out"}
            </h2>
            <p className="text-gray-700 mb-6">
              {property?.soldOut
                ? "Do you want to make this property available again?"
                : "Do you want to mark this property as Sold Out?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSoldOutConfirmation}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                {property?.soldOut ? "Yes, Make Available" : "Yes, Sold Out"}
              </button>
              <button
                onClick={() => setShowSoldOutModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default PropertyDetailsVendor;
