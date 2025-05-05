import React, { useState } from "react";
import { FiMessageCircle, FiPhoneCall, FiMail } from "react-icons/fi";
import { contactUs } from "../../services/allApi/userAllApi";
import { Toast } from "../Toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    mail: "",
    message: "",
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactUs(formData);
      setToast({
        show: true,
        message: "Message sent successfully!",
        type: "success",
      });
      setFormData({ name: "", number: "", mail: "", message: "" });
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Failed to send message.",
        type: "error",
      });
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8">
            Get In Touch
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FiMessageCircle className="text-3xl text-blue-900 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Chat with us
                </h3>
                <p className="text-gray-600">
                  Have a quick question or need help finding your dream property? Start a chat — our team is ready to assist you in real-time.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiPhoneCall className="text-3xl text-blue-900 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Give us a call
                </h3>
                <p className="text-gray-600">
                  Prefer to talk? Give us a call and we’ll guide you through every step of your property journey.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiMail className="text-3xl text-blue-900 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  Email us
                </h3>
                <p className="text-gray-600">
                  Got something detailed to discuss? Drop us an email anytime — we’ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Send Message Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Send A Message
          </h2>
          <p className="text-gray-700 mb-6">
            We’re just a message away! Whether you're buying, selling, or simply exploring, feel free to connect with us. Reach out to us anytime – we’d love to hear from you!
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                placeholder="Enter your email"
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full p-10">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.016177157918!2d76.65512041466973!3d10.786730692323203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ca57e87c67%3A0xeac6edc5cb1f81ae!2sPazhaya%20Lakkidi%2C%20Palakkad!5e0!3m2!1sen!2sin!4v1688213215261!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default ContactSection;
