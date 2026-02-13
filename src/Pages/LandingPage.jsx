import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

/* ================= INFINITE COLUMN ================= */
const InfiniteColumn = ({ images, speed = 40, delay = 0 }) => {
  return (
    <div className="relative h-full overflow-hidden">
      <div
        className="flex flex-col gap-6 infinite-vertical"
        style={{
          animationDuration: `${speed}s`,
          animationDelay: `${delay}s`,
        }}
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            className="w-64 xl:w-72 aspect-[3/4] overflow-hidden rounded-xl shadow-2xl"
          >
            <img
              src={img}
              alt="carousel"
              className="w-full h-full object-cover brightness-90 transition-transform duration-700 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ================= LANDING PAGE ================= */
const LandingPage = () => {
  const expertise = [
    "Interior Design",
    "IT Solutions",
    "Preparation Land",
    "Civil",
  ];

  const [images, setImages] = useState([]);
  const goldColor = "#FFB500";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/landing-images"
        );
        const data = await response.json();

        const imageUrls = data
          .slice(0, 8)
          .map((img) => `http://localhost:8000/storage/${img.image_path}`);

        setImages(imageUrls.length ? imageUrls : Array(8).fill("/test.jpg"));
      } catch (error) {
        setImages(Array(8).fill("/test.jpg"));
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-black text-white w-full min-h-screen font-sans relative overflow-hidden">
      <Navbar activePage="home" />

      {/* ================= RIGHT INFINITE CAROUSEL ================= */}
      <div className="hidden lg:block absolute right-0 top-0 w-[45%] xl:w-1/2 h-full px-6 xl:px-10">
        <div className="flex gap-10 h-full rotate-[-2deg]">
          <InfiniteColumn images={images} speed={42} />
          <InfiniteColumn images={images} speed={60} delay={-10} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className="
          relative z-20 
          grid grid-cols-1 lg:grid-cols-2 
          min-h-screen 
          items-center 
          px-4 sm:px-8 md:px-14 lg:px-24 
          pt-28
        "
      >
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          
          {/* HERO TITLE */}
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-medium leading-tight mb-6 tracking-tight">
            You Dream It
            <br />
            We Build It
          </h1>

          {/* HERO SUBTITLE */}
          <p className="hero-sub text-gray-400 text-sm sm:text-base md:text-lg mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
            We deliver end-to-end solutions by providing integrated services
            from concept, planning, and development to final execution.
          </p>

          {/* ================= EXPERTISE ================= */}
          <div className="mt-4">
            <h3
              className="hero-sub italic font-serif text-lg sm:text-xl mb-6"
              style={{ color: goldColor }}
            >
              Our Expertise
            </h3>

            <ul className="max-w-lg mx-auto lg:mx-0">
              {expertise.map((item, index) => (
                <li
                  key={index}
                  className="expert-item group border-t border-gray-700 py-4 flex items-center justify-center lg:justify-start cursor-pointer hover:bg-white/5 transition-all"
                  style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                >
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-serif flex items-center transition-all duration-300 group-hover:italic group-hover:text-yellow-500">
                    <span className="w-2 h-2 border border-white rounded-full mr-6 transition-all group-hover:border-yellow-500 group-hover:scale-125" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item}
                    </span>
                    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 text-yellow-500">
                      →
                    </span>
                  </span>
                </li>
              ))}
              <div className="border-t border-gray-700" />
            </ul>
          </div>
        </div>
      </main>

      {/* ================= ANIMATIONS ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* HERO TEXT */
        .hero-title {
          opacity: 0;
          transform: translateY(40px);
          animation: heroReveal 1s ease-out forwards;
        }

        .hero-sub {
          opacity: 0;
          transform: translateY(30px);
          animation: heroReveal 1s ease-out forwards;
          animation-delay: 0.25s;
        }

        @keyframes heroReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* EXPERTISE LIST */
        .expert-item {
          opacity: 0;
          transform: translateX(-20px);
          animation: listReveal 0.8s ease-out forwards;
        }

        @keyframes listReveal {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* INFINITE CAROUSEL */
        @keyframes infinite-vertical {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }

        .infinite-vertical {
          animation-name: infinite-vertical;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />
    </div>
  );
};

export default LandingPage;
