import React, { useEffect, useRef } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { useInView } from 'react-intersection-observer';

import person1 from '../../assets/person1.jpg';
import person2 from '../../assets/person2.jpg';
import person3 from '../../assets/person3.jpg';
import person4 from '../../assets/person4.jpg';
import home1 from '../../assets/smallhome1.jpg';
import home2 from '../../assets/smallhome2.jpg';
import home3 from '../../assets/smallhome3.jpg';
import home4 from '../../assets/smallhome4.jpg';

const CountOnView = ({ end, suffix = '', duration = 2 }) => {
  const countUpRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const { start } = useCountUp({
    ref: countUpRef,
    end,
    duration,
    suffix,          // This handles + automatically
    startOnMount: false,
  });

  useEffect(() => {
    if (inView) {
      start();
    }
  }, [inView, start]);

  return (
    <h2 ref={ref} className="text-5xl font-bold text-blue-500">
      <span ref={countUpRef} />
    </h2>
  );
};


const AboutSection = () => {
  return (
    <div className="bg-blue-50 min-h-screen mt-5">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-8 overflow-hidden">
          {/* Text section */}
          <div className="md:w-1/2" data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-5xl font-bold text-indigo-900 mb-6">Who we are ?</h1>
            <p className="text-gray-800 text-lg mb-8">
              We offer a range of servicing including buying, selling, and property management.
            </p>
            <div className="flex gap-12 mt-6">
              <div className="text-center">
                <CountOnView end={80} suffix="+" />
                <p className="text-blue-800 text-lg">Premium houses</p>
              </div>
              <div className="text-center">
                <CountOnView end={500} suffix="+" />
                <p className="text-blue-800 text-lg">Agent Houses</p>
              </div>
              <div className="text-center">
                <CountOnView end={3000} />
                <p className="text-blue-800 text-lg">Happy client</p>
              </div>
            </div>
          </div>

          {/* Image section */}
          <div className="md:w-1/2 grid grid-cols-2 gap-4" data-aos="fade-left" data-aos-duration="1000">
            {[home1, home2, home3].map((home, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <img src={home} alt={`Home ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="relative rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img src={home4} alt="Modern architecture" className="w-full h-3/4 object-cover" />
              <div className="flex justify-center mt-2">
                <div className="flex -space-x-4">
                  {[person1, person2, person3, person4].map((person, index) => (
                    <img
                      key={index}
                      src={person}
                      alt={`Team member ${index + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-white transform transition hover:scale-110 hover:ring-2 hover:ring-blue-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
