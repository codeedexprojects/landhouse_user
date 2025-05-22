import { FileText, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import { QRCode } from 'react-qr-code';

export default function ReferralSection({ profileData }) {
  const copyReferralId = () => {
    if (profileData?.referralId) {
      const referralLink = `https://landouse.com/register?referralCode=${profileData.referralId}`;
      navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        {/* Title Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Referral</h2>
          <div className="bg-blue-100 p-2 rounded-full">
            <FileText className="text-blue-600" size={20} />
          </div>
        </div>

        {/* Referral ID Section */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Your Referral ID</p>
          <h3 className="text-2xl font-bold text-gray-900">
            {profileData?.referralId || 'N/A'}
          </h3>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-3"></div>

        {/* Referral Link Section */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500">Share your referral link:</p>
          <div className="flex items-center bg-gray-50 rounded-lg p-2 border border-gray-200">
            <span className="text-sm text-gray-700 truncate">
              https://landouse.com/register?referralCode={profileData?.referralId || 'N/A'}
            </span>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center pt-4 space-y-2">
          <div className="bg-white p-2 border border-gray-200 rounded-lg">
            <QRCode 
              value={`https://landouse.com/register?referralCode=${profileData?.referralId || 'N/A'}`}
              size={120}
              bgColor="#ffffff"
              fgColor="#000000"
              level="Q"
            />
          </div>
          <p className="text-xs text-gray-500">Scan to share</p>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyReferralId}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Copy Referral Link
        </button>
      </div>
    </div>
  );
}