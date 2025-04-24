import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Link</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Properties</a></li>
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" /> <span>Address</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" /> <span>+91 1231231234</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> <span>info@landouse.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
          <p className="mb-4">
            Subscribe to our newsletter for the latest land listings, investment tips, and property news.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto flex-1"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Bottom Section */}
      <div className="text-center py-4 text-sm px-8 md:px-16">
        <p>© Landouse - All rights reserved</p>
        <div className="flex justify-center space-x-4 mt-2 text-xl">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaWhatsapp /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
