import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const TickIcon = () => (
  <span className="w-5 h-5 bg-indigo-900 rounded-sm flex items-center justify-center mt-1">
    <svg
      className="w-3 h-3 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const LandouseSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <section className="bg-[#F7F9FC] px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
  <h2 className="text-2xl font-semibold text-indigo-900 mb-4" data-aos="fade-up">
    Landouse
  </h2>

  <p className="text-gray-700 leading-relaxed mb-6" data-aos="fade-up" data-aos-delay="100">
    Landouse is a sister concern of Mycare Associates. Mycare associates also known as Mycare Home Loan Services.
    It is located in capital city of God’s Own country. Our firm ties up with different banks and NBFCs for
    providing better customer service. Services available from Landouse are,
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 mb-6 text-gray-800">
    <div className="space-y-3" data-aos="fade-up" data-aos-delay="200">
      <p className="flex items-start gap-2">
        <TickIcon /> House purchase Loan
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> House construction Loan
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> House maintenance Loan
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> Land purchase Loan
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> Land purchase + Construction Loan
      </p>
    </div>

    <div className="space-y-3" data-aos="fade-up" data-aos-delay="300">
      <p className="flex items-start gap-2">
        <TickIcon /> Commercial building purchase Loan
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> Commercial building construction Loan
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> Housing loan Bank transfer
      </p>
      <p className="flex items-start gap-2">
        <TickIcon /> Housing loan top up
      </p>
    </div>
  </div>

  <p className="text-gray-700 leading-relaxed" data-aos="fade-up" data-aos-delay="400">
    Now, we are taking the next step in the real estate sector with trust and integrity. To make this move, we
    have developed a free real estate website portal. Now you can Buy, Sell, Rent & lease your property for free
    with Landouse.
  </p>
</div>

    </section>
  );
};

export default LandouseSection;
