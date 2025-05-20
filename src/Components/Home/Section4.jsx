import React from 'react';
import person1 from '../../assets/person1.jpg'
import person2 from '../../assets/person2.jpg'
import person3 from '../../assets/person3.jpg'
import person4 from '../../assets/person4.jpg'
import home1 from '../../assets/smallhome1.jpg'
import home2 from '../../assets/smallhome2.jpg'
import home3 from '../../assets/smallhome3.jpg'
import home4 from '../../assets/smallhome4.jpg'


const AboutSection = () => {
  return (
    <div className="bg-blue-50 min-h-screen mt-5">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 py-8 overflow-hidden">
          <div className="md:w-1/2" data-aos="fade-right" data-aos-duration="1000">
            <h1 className="text-5xl font-bold text-indigo-900 mb-6">Who we are ?</h1>
            <p className="text-gray-800 text-lg mb-8">
              We offer a range of servicing including buying, selling, and property management.
            </p>
            <div className="flex gap-12 mt-6">
              <div className="text-center">
                <h2 className="text-5xl font-bold text-blue-500">80+</h2>
                <p className="text-blue-800 text-lg">Premium houses</p>
              </div>
              <div className="text-center">
                <h2 className="text-5xl font-bold text-blue-500">500+</h2>
                <p className="text-blue-800 text-lg">Agent Houses</p>
              </div>
              <div className="text-center">
                <h2 className="text-5xl font-bold text-blue-500">3K</h2>
                <p className="text-blue-800 text-lg">Happy client</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4" data-aos="fade-left" data-aos-duration="1000">
            <div className="rounded-lg overflow-hidden">
              <img src={home1} alt="House with porch" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src={home2} alt="White house with porch" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img src={home3} alt="Red roof house" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src={home4} alt="Modern architecture" className="w-full h-3/4 object-cover" />
              <div className="flex justify-center mt-2">
                <div className="flex -space-x-4">
                  <img src={person1} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src={person2} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src={person3} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src={person4} alt="Team member" className="w-10 h-10 rounded-full border-2 border-white" />
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