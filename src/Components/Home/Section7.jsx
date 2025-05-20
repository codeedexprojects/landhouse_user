import React from 'react';
import { FaTimes, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import QRCode from 'react-qr-code';

const ShareModal = ({ referralLink, onClose, onCopy, onFacebookShare, onTwitterShare, onWhatsAppShare }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-lg" />
        </button>
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Share Property</h3>
          <p className="text-gray-600 mb-4">Share this property with friends</p>
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            onClick={(e) => e.target.select()}
          />
          <button
            onClick={onCopy}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded hover:bg-blue-200"
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={onFacebookShare}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FaFacebook className="text-blue-600" />
          </button>
          <button
            onClick={onTwitterShare}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FaTwitter className="text-blue-400" />
          </button>
          <button
            onClick={onWhatsAppShare}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FaWhatsapp className="text-green-500" />
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <QRCode value={referralLink} size={128} />
            <p className="text-xs text-gray-500 text-center mt-2">Scan to open this link</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;