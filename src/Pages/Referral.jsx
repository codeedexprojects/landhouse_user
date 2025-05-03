import React, { useState, useEffect } from 'react';
import { FaRegCopy, FaShareAlt } from 'react-icons/fa';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import image from "../assets/invite.png";
import { getProfile } from '../services/allApi/userAllApi';

const InvitePage = () => {
  const [copied, setCopied] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  
  useEffect(() => {
    const fetchReferralId = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Make sure this key is correct
        const data = await getProfile(userId);
        setInviteCode(data.user.referralId);
      } catch (error) {
        console.error('Error fetching referralId:', error);
      }
    };

    fetchReferralId();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8 text-center">
        <img src={image} alt="Invite illustration" className="w-60 mb-6" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Found a place you love?</h2>
        <p className="text-gray-600 mb-6">
          Help others find theirs. Landouse makes home-finding smoother – share the joy!
        </p>
        <div className="w-full max-w-xs mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Invite Code</label>
          <div className="flex items-center justify-between bg-blue-100 border border-dashed border-blue-300 rounded-md px-3 py-2">
            <span className="font-medium text-blue-800">{inviteCode || 'Loading...'}</span>
            <button
              onClick={handleCopy}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              disabled={!inviteCode}
            >
              {copied ? 'Copied!' : 'tap to copy'}
              <FaRegCopy />
            </button>
          </div>
        </div>
        <button className="bg-blue-600 text-white flex items-center justify-center gap-2 px-5 py-2 rounded-md shadow hover:bg-blue-700 transition">
          <FaShareAlt /> Share Invite Link
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default InvitePage;
