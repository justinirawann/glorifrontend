import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const expertise = ["Interior Design", "IT Solutions", "Preparation Land", "Civil"];
  const [images, setImages] = useState([
    "/test.jpg",
    "/test.jpg", 
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
    "/test.jpg",
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/landing-images');
        if (response.ok) {
          const data = await response.json();
          if (data.images && data.images.length > 0) {
            setImages(data.images);
          }
        }
      } catch (error) {
        console.log('Using default images:', error);
      }
    };
    
    fetchImages();
  }, []);

  const goldColor = "#FFB500";

  return (
    <div className="bg-black text-white h-screen w-full overflow-hidden font-sans relative">

      {/* --- RIGHT INFINITE CAROUSEL --- */}
      <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden px-10 opacity-100">
        <div className="flex gap-10 h-full">

          {/* COLUMN 1 */}
          <div className="flex flex-col gap-8 animate-scroll-up">
            {[...images, ...images].map((img, i) => (
              <div key={i} className="w-72 h-[460px] flex-shrink-0">
                <img 
                  src={img} 
                  alt="interior" 
                  className="w-full h-full object-cover rounded-sm shadow-2xl brightness-90"
                />
              </div>
            ))}
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-8 animate-scroll-up-slow mt-32">
            {[...images, ...images].map((img, i) => (
              <div key={i} className="w-72 h-[460px] flex-shrink-0">
                <img 
                  src={img} 
                  alt="interior" 
                  className="w-full h-full object-cover rounded-sm shadow-2xl brightness-90"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
      </div>

      <Navbar activePage="home" />

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-20 grid grid-cols-2 h-[calc(100vh-80px)] items-center px-24">
        <div className="max-w-2xl">
          <h1 className="text-8xl font-serif font-medium leading-tight mb-4 tracking-tight">
            You Dream It<br />
            We Build It
          </h1>

          <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
            We deliver end-to-end solutions by providing integrated services 
            from concept, planning, and development to final execution.
          </p>

          {/* --- EXPERTISE --- */}
          <div className="mt-8">
            <h3 className="italic font-serif text-xl mb-6" style={{ color: goldColor }}>
              Our Expertise
            </h3>

            <ul className="space-y-0 max-w-lg">
              {expertise.map((item, index) => (
                <li 
                  key={index} 
                  className="group border-t border-gray-700 py-5 flex items-center cursor-pointer hover:bg-white/5 transition-all"
                >
                  <span className="text-4xl font-serif flex items-center transition-all duration-300 group-hover:italic group-hover:text-yellow-500">

                    {/* Dot */}
                    <span className="w-2 h-2 border border-white rounded-full mr-6 inline-block 
                      transition-all group-hover:border-yellow-500 group-hover:scale-125"></span>

                    {/* Text */}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item}
                    </span>

                    {/* Arrow */}
                    <span className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 text-yellow-500">
                      →
                    </span>

                  </span>
                </li>
              ))}
              <div className="border-t border-gray-700"></div>
            </ul>
          </div>
        </div>
      </main>

      {/* --- ANIMATION CSS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-460px * 8 - 32px * 8)); }
        }

        .animate-scroll-up {
          animation: scroll-up 40s linear infinite;
        }

        .animate-scroll-up-slow {
          animation: scroll-up 50s linear infinite;
        }
      `}} />

    </div>
  );
};

export default LandingPage;
