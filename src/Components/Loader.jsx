import React from 'react';

const Loader = () => {
  return (
    <>
      <style>
        {`
          @keyframes pulseDot {
            0% {
              transform: scale(0.8);
              background-color: #b3d4fc;
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
            50% {
              transform: scale(1.2);
              background-color: #6793fb;
              box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
            }
            100% {
              transform: scale(0.8);
              background-color: #b3d4fc;
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
          }
        `}
      </style>

      <section className="flex items-center justify-center w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-5 w-5 rounded-full mr-2 last:mr-0"
            style={{
              animation: 'pulseDot 1.5s ease-in-out infinite',
              animationDelay: `${-0.3 + i * 0.2}s`,
            }}
          ></div>
        ))}
      </section>
    </>
  );
};

export default Loader;
