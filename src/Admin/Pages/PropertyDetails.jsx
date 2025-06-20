import React, { useEffect, useState } from "react";
import propertyCard from "/src/assets/properImage.png";
import { IoLocation } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaBed, FaBath } from "react-icons/fa";
import { BsBoundingBoxCircles, BsSquare } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineDeleteOutline, MdOutlinePhoneInTalk } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoBarcode } from "react-icons/io5";
import {
  deletePropertyAPI,
  getLatestEnquireisProperty,
  adminSoldOutAPI,
} from "../../services/allApi/adminAllApis";
import { Edit } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function PropertyDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  const [latestEnquiry, setLatestEnquiry] = useState(null);
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchLatestEnquiry = async () => {
      try {
        const data = await getLatestEnquireisProperty(property._id);
        if (data?.enquiries?.length) {
          const sortedEnquiries = data.enquiries.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestEnquiry(sortedEnquiries[0]);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };

    fetchLatestEnquiry();
  }, [property]);

  useEffect(() => {
    if (!property) {
      navigate("/admin/view-property");
    }
  }, [property, navigate]);

  if (!property) return null;

  const addressParts = property?.address?.split(",").map((part) => part.trim());
  const [street, city, state] = addressParts || [];

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  const [showAdminSoldOutModal, setAdminShowSoldOutModal] = useState(false);

  const handleAdminSoldOutConfirmation = async () => {
    try {
      const newSoldOutStatus = !property.soldOut;
      console.log("Sending ID:", property._id);
      console.log("Sending soldOut:", newSoldOutStatus);

      const result = await adminSoldOutAPI(property._id, newSoldOutStatus);
      console.log("API response:", result);

      if (result.success) {
        property.soldOut = newSoldOutStatus;
        toast.success(
          newSoldOutStatus
            ? "Property marked as Sold Out!"
            : "Property is now available!"
        );
      } else {
        toast.error(result.message || "Failed to update property status.");
      }

      setAdminShowSoldOutModal(false);
    } catch (error) {
      toast.error("Failed to update property status (request failed).");
      setAdminShowSoldOutModal(false);
    }
  };




  const confirmDelete = async () => {
    try {
      const response = await deletePropertyAPI(selectedPropertyId);
      if (response.status === 200) {
        toast.success("Item deleted successfully!");
        setShowConfirmModal(false);
        setTimeout(() => {
          navigate("/admin/view-property");
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
    navigate("/admin/edit-property", { state: { property } });
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
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full h-64"
          >
            {property.photos?.map((photo, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setLightboxOpen(true);
                }}
                className="cursor-zoom-in"
              >
                <img
                  src={photo}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-property.jpg";
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {lightboxOpen && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              &times;
            </button>

            <div className="relative w-full max-w-4xl">
              <img
                src={property.photos[selectedImageIndex]}
                alt={`Full view - Property ${selectedImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) =>
                    (prev - 1 + property.photos.length) % property.photos.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full"
              >
                &larr;
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex((prev) =>
                    (prev + 1) % property.photos.length
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 text-white p-2 rounded-full"
              >
                &rarr;
              </button>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-indigo-900">
              {property.property_type} @ {city}
            </h2>


            <div className="flex gap-2">
              <button
                onClick={() => setAdminShowSoldOutModal(true)}
                className={`px-4 py-1 rounded-md text-sm ${property?.soldOut
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
          <div className="flex items-center gap-2 mb-2 text-gray-700">
            <IoBarcode className="text-blue-900" size={20} />
            <p> <b>Product Code :</b> {property?.productCode}</p>
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

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Property Specifications</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Show specifications only if they exist */}
              {property?.buildIn && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Build In</span>
                  <span className="font-medium">{property?.buildIn}</span>
                </div>
              )}

              {property?.beds && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-medium">{property?.beds}</span>
                </div>
              )}

              {property?.baths && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-medium">{property?.baths}</span>
                </div>
              )}

              {property?.area && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Buildup Area</span>
                  <span className="font-medium">{property?.area} sqft</span>
                </div>
              )}

              {property?.carpet_area && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Carpet Area</span>
                  <span className="font-medium">{property?.carpet_area} sqft</span>
                </div>
              )}

              {property?.cent && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Land Area</span>
                  <span className="font-medium">{property?.cent} cent</span>
                </div>
              )}

              {property?.price_per_cent && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Price per Cent</span>
                  <span className="font-medium">₹{property?.price_per_cent}</span>
                </div>
              )}

              {property?.car_parking && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Car Parking</span>
                  <span className="font-medium">{property?.car_parking}</span>
                </div>
              )}

              {property?.car_access && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Car Access</span>
                  <span className="font-medium">{property?.car_access === 'yes' ? 'Yes' : 'No'}</span>
                </div>
              )}

              {property?.floor && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Floor</span>
                  <span className="font-medium">{property?.floor}</span>
                </div>
              )}

              {property?.road_frontage && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Road Frontage</span>
                  <span className="font-medium">{property?.road_frontage}</span>
                </div>
              )}

              {property?.maxrooms && (
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Max Rooms</span>
                  <span className="font-medium">{property?.maxrooms}</span>
                </div>
              )}
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

      <div className="rounded-lg overflow-hidden shadow-md bg-white p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Listed By</h3>
        <div className="flex bg-blue-50 rounded-xl overflow-hidden">
          <div className="w-1/3 p-4 space-y-2 rounded-xl">
            <p className="font-bold text-blue-900">Name</p>
            <p className="font-bold text-blue-900">Email</p>
            <p className="font-bold text-blue-900">Number</p>
          </div>
          <div className="w-2/3 p-4 space-y-2 rounded-xl">
            <p className="text-gray-800">
              {property?.created_by?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              {property?.created_by?.email || "N/A"}
            </p>
            <p className="text-gray-800">
              {property?.created_by?.number || "N/A"}
            </p>
          </div>
        </div>
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
        <h2 className="text-2xl font-bold text-[#0B0B45] mb-6">Latest Enquiry</h2>
        <div className="grid grid-cols-6 font-semibold text-gray-600 py-2 border-b">
          <h6>Sl No</h6>
          <h6>Name</h6>
          <h6>Phone</h6>
          <h6>Email</h6>
          <h6>Message</h6>
          <h6>Action</h6>
        </div>

        {latestEnquiry ? (
          <div className="grid grid-cols-6 items-center text-gray-700 py-4 border-b">
            <p>01</p>
            <div className="flex items-center gap-3">
              <img
                src="https://via.placeholder.com/40"
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">
                {latestEnquiry.userId
                  ? `${latestEnquiry.userId.firstName} ${latestEnquiry.userId.lastName}`
                  : latestEnquiry.name}
              </span>
            </div>
            <p>{latestEnquiry.phoneNumber || latestEnquiry.userId?.phoneNumber}</p>
            <p>{latestEnquiry.email || latestEnquiry.userId?.email}</p>
            <p className="text-blue-500 cursor-pointer">{latestEnquiry.message}</p>
            <div className="text-xl text-blue-500 cursor-pointer">
              <MdOutlinePhoneInTalk />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 py-4">No enquiries found.</p>
        )}
      </div>

      {/* confirmationmodal */}
      {showConfirmModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
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

      {showAdminSoldOutModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
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
                onClick={handleAdminSoldOutConfirmation}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                {property?.soldOut ? "Yes, Make Available" : "Yes, Sold Out"}
              </button>
              <button
                onClick={() => setAdminShowSoldOutModal(false)}
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

export default PropertyDetails;
