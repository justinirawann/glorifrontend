import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';

const LandingPage = () => {
  const expertise = ["Interior Design", "IT Solutions", "Preparation Land", "Civil"];
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/landing-images');
        const data = await response.json();
        const imageUrls = data.map(img => `http://localhost:8000/storage/${img.image_path}`);
        setImages(imageUrls.length > 0 ? imageUrls : ["/test.jpg"]);
      } catch (error) {
        console.log('Using default images:', error);
        setImages(["/test.jpg"]);
      }
    };
    fetchImages();
  }, []);

  const goldColor = "#FFB500";

  return (
    <div className="
      bg-black text-white w-full font-sans relative
      min-h-screen
      overflow-hidden
      md:overflow-y-auto
      lg:overflow-hidden
    ">

      {/* ================= RIGHT HERO (DESKTOP ONLY) ================= */}
      <div className="hidden lg:block absolute right-0 top-0 w-[45%] xl:w-1/2 h-full overflow-hidden px-6 xl:px-10">

        <div className="flex gap-8 h-full">

          {/* COLUMN 1 */}
          <div className="flex flex-col gap-6 animate-scroll-up">
            {[...images, ...images].map((img, i) => (
              <div 
                key={i} 
                className="w-64 xl:w-72 h-[360px] xl:h-[460px] flex-shrink-0 overflow-hidden rounded-md shadow-2xl"
              >
                <img 
                  src={img} 
                  alt="interior" 
                  className="w-full h-full object-cover brightness-90 transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-6 animate-scroll-up-slow mt-24">
            {[...images, ...images].map((img, i) => (
              <div 
                key={i} 
                className="w-64 xl:w-72 h-[360px] xl:h-[460px] flex-shrink-0 overflow-hidden rounded-md shadow-2xl"
              >
                <img 
                  src={img} 
                  alt="interior" 
                  className="w-full h-full object-cover brightness-90 transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
      </div>

      <Navbar activePage="home" />

      {/* ================= MAIN CONTENT ================= */}
      <main className="
        relative z-20 
        grid grid-cols-1 lg:grid-cols-2 
        min-h-screen lg:h-screen 
        items-center 
        px-4 sm:px-8 md:px-14 lg:px-24 
        pt-24 sm:pt-28
      ">

        <div className="
          max-w-2xl 
          mx-auto lg:mx-0 
          text-center lg:text-left
        ">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-medium leading-tight mb-6 tracking-tight">
            You Dream It<br />
            We Build It
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            We deliver end-to-end solutions by providing integrated services 
            from concept, planning, and development to final execution.
          </p>

          {/* ================= EXPERTISE ================= */}
          <div className="mt-4">
            <h3 className="italic font-serif text-lg sm:text-xl mb-6" style={{ color: goldColor }}>
              Our Expertise
            </h3>

            <ul className="space-y-0 max-w-lg mx-auto lg:mx-0">
              {expertise.map((item, index) => (
                <li 
                  key={index} 
                  className="group border-t border-gray-700 py-3 sm:py-4 
                             flex items-center justify-center lg:justify-start
                             cursor-pointer hover:bg-white/5 transition-all"
                >
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif flex items-center transition-all duration-300 group-hover:italic group-hover:text-yellow-500">

                    {/* Dot */}
                    <span className="w-2 h-2 border border-white rounded-full mr-4 sm:mr-6 inline-block 
                      transition-all group-hover:border-yellow-500 group-hover:scale-125"></span>

                    {/* Text */}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item}
                    </span>

                    {/* Arrow */}
                    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 text-yellow-500">
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

      {/* ================= ANIMATION ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-420px * 8 - 24px * 8)); }
        }

        .animate-scroll-up {
          animation: scroll-up 42s linear infinite;
        }

        .animate-scroll-up-slow {
          animation: scroll-up 60s linear infinite;
        }
      `}} />

    </div>
  );
};

export default LandingPage;
