import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from "../../assets/roundimage.png"

const DreamProperty = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.6;
          }
        }

        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .circle-container {
          position: relative;
        }

        .pulse-ring {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .rotating-ring {
          animation: rotate-slow 20s linear infinite;
        }

        .reverse-rotating-ring {
          animation: rotate-reverse 15s linear infinite;
        }

        .floating-container {
          animation: float 4s ease-in-out infinite;
        }

        .ripple-effect {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.3);
          animation: ripple 2s ease-out infinite;
        }

        .ripple-effect:nth-child(2) {
          animation-delay: 0.5s;
        }

        .ripple-effect:nth-child(3) {
          animation-delay: 1s;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        .rotating-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .rotating-dots::before,
        .rotating-dots::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: #3b82f6;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
        }

        .rotating-dots::before {
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          animation: rotate-slow 10s linear infinite;
          transform-origin: 0 126px;
        }

        .rotating-dots::after {
          bottom: 10px;
          right: 50%;
          transform: translateX(50%);
          animation: rotate-reverse 8s linear infinite;
          transform-origin: 0 -126px;
        }

        .glow-effect {
          box-shadow: 
            0 0 20px rgba(59, 130, 246, 0.3),
            0 0 40px rgba(59, 130, 246, 0.2),
            0 0 60px rgba(59, 130, 246, 0.1);
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 50%;
        }

        .image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shimmer 2.5s ease-in-out infinite;
          z-index: 1;
        }
      `}</style>

      <div className="bg-blue-50 w-full flex items-center justify-center py-16 px-4 overflow-hidden" data-aos="fade-up">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 p-4 md:p-8" data-aos="fade-right" data-aos-delay="200">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Your Dream Property
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-md">
              Discover the ideal property that suits your needs and lifestyle. Start your journey to the perfect home today!
            </p>
            <button 
              onClick={handleContactClick} 
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 text-base sm:text-lg rounded transition duration-300 transform hover:scale-105"
            >
              Contact Now
            </button>
          </div>
          
          <div className="md:w-1/2 p-4 md:p-0 mt-8 md:mt-0 relative flex justify-center" data-aos="fade-left" data-aos-delay="400">
            <div className="circle-container floating-container">
              {/* Ripple Effects */}
              <div className="ripple-effect"></div>
              <div className="ripple-effect"></div>
              <div className="ripple-effect"></div>
              
              {/* Main Circle Container */}
              <div className="w-72 h-72 rounded-full bg-blue-100/50 border-8 border-white/20 p-2 relative flex items-center justify-center glow-effect">
                
                {/* Rotating Dots */}
                <div className="rotating-dots"></div>
                
                {/* Animated Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 -m-2 pulse-ring"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-300 -m-4 rotating-ring"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 -m-6 reverse-rotating-ring"></div>
                
                {/* Additional Decorative Elements */}
                <div className="absolute inset-0 rounded-full border border-blue-500/30 -m-8 pulse-ring" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 rounded-full border border-blue-600/20 -m-10 rotating-ring" style={{ animationDelay: '0.5s', animationDuration: '25s' }}></div>
                
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 rounded-full shimmer-effect -m-2"></div>
                
                {/* Image Container */}
                <div className="image-container w-64 h-64 relative">
                  <img
                    src={image1}
                    alt="Modern dream home"
                    className="w-full h-full rounded-full object-cover relative z-0"
                  />
                </div>
                
                {/* Floating Particles */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full" style={{ animation: 'float 3s ease-in-out infinite, pulse-slow 2s ease-in-out infinite' }}></div>
                <div className="absolute top-12 right-12 w-1.5 h-1.5 bg-blue-500 rounded-full" style={{ animation: 'float 4s ease-in-out infinite 0.5s, pulse-slow 2.5s ease-in-out infinite 0.3s' }}></div>
                <div className="absolute bottom-16 left-16 w-1 h-1 bg-blue-600 rounded-full" style={{ animation: 'float 3.5s ease-in-out infinite 1s, pulse-slow 2.2s ease-in-out infinite 0.7s' }}></div>
                <div className="absolute bottom-8 right-8 w-2.5 h-2.5 bg-blue-300 rounded-full" style={{ animation: 'float 2.8s ease-in-out infinite 1.5s, pulse-slow 1.8s ease-in-out infinite 1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DreamProperty;