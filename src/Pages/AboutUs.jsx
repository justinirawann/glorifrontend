  import React, { useState, useEffect } from "react";
  import { Link } from 'react-router-dom';
  import Navbar from '../components/Navbar';

  const AboutUs = () => {
    const goldColor = "#FFB500";
    const [clientLogos, setClientLogos] = useState([]);

    useEffect(() => {
      const fetchLogos = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/client-logos');
          const data = await response.json();
          setClientLogos(data);
        } catch (error) {
          console.log('Error fetching client logos:', error);
        }
      };
      fetchLogos();
    }, []);

    const workSteps = [
      {
        title: "Careful Planning",
        desc: "Every project starts with structured planning to ensure clarity, efficiency, and quality.",
      },
      {
        title: "Integrated Coordination",
        desc: "Our team works across all services to maintain seamless communication and execution.",
      },
      {
        title: "Precise Execution",
        desc: "Each stage is handled with accuracy and professionalism for consistent results.",
      },
      {
        title: "Client-Focused Quality",
        desc: "We deliver practical solutions aligned with client needs, timelines, and long-term performance.",
      },
    ];

    return (
      <div className="bg-black text-white font-sans">
        
        <Navbar activePage="about" />
        
        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-screen flex flex-col justify-center px-12 md:px-24 pt-24">
          {/* BACKGROUND EFFECT - ABSTRACT GOLD LINES WITH GLOW */}
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glowHero">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="goldGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFB500', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
              <path d="M 0 200 Q 400 100 800 250 T 1600 200" stroke="url(#goldGradHero)" strokeWidth="8" fill="none" filter="url(#glowHero)" />
              <path d="M 300 0 Q 600 300 1000 150 T 1800 100" stroke="url(#goldGradHero)" strokeWidth="6" fill="none" filter="url(#glowHero)" />
              <line x1="200" y1="0" x2="400" y2="600" stroke="#FFB500" strokeWidth="4" filter="url(#glowHero)" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif max-w-4xl leading-tight mb-4 relative z-10">
            We provides <span className="italic" style={{ color: goldColor }}>integrated</span> solutions built on expertise, precision, and reliable execution.
          </h1>
          
          <div className="relative w-full flex justify-end z-10 mt-1">

            {/* DESKTOP / LAPTOP VERSION (MASKED HERO) */}
            <div className="hidden md:block relative w-full md:w-[78%] h-[520px] rounded-[50px] shadow-2xl bg-black">
              <div className="relative w-full h-full overflow-hidden rounded-[50px]">
                <img 
                  src="/interior-hero.jpg" 
                  alt="Interior Design" 
                  className="w-full h-full object-cover scale-[1.05]"
                />

                {/* MASKING CEKUNG */}
                <div className="absolute top-0 left-0 w-[180px] h-[80px] bg-black rounded-br-[50px] z-20">
                  <div className="absolute -right-[20px] top-0 w-[20px] h-[20px] rounded-tl-[20px] shadow-[-10px_-10px_0_10px_black] z-30"></div>
                  <div className="absolute left-0 -bottom-[20px] w-[20px] h-[20px] rounded-tl-[20px] shadow-[-10px_-10px_0_10px_black] z-30"></div>
                </div>

              </div>
            </div>


            {/* MOBILE / TABLET VERSION (SIMPLE BOX HERO) */}
            <div className="block md:hidden w-full mt-6 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/interior-hero.jpg" 
                alt="Interior Design Mobile" 
                className="w-full h-[260px] object-cover"
              />
            </div>

          </div>


        </section>

        {/* --- SECTION 2: ABOUT TEXT --- */}
        <section className="py-32 px-12 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-start relative overflow-hidden">
          
          {/* BACKGROUND EFFECT - ABSTRACT GOLD LINES WITH GLOW */}
          <div className="absolute inset-0 opacity-30">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glowAbout">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="goldGradAbout" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFB500', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
              <path d="M 0 150 Q 350 80 700 180 T 1400 150" stroke="url(#goldGradAbout)" strokeWidth="8" fill="none" filter="url(#glowAbout)" />
              <path d="M 250 0 Q 550 250 900 120 T 1600 80" stroke="url(#goldGradAbout)" strokeWidth="6" fill="none" filter="url(#glowAbout)" />
              <line x1="1000" y1="0" x2="1200" y2="500" stroke="#FF8C00" strokeWidth="5" filter="url(#glowAbout)" />
            </svg>
          </div>
          
          <h2 className="text-5xl font-serif relative z-10">About <br /> Glori</h2>
          
          <div className="max-w-xl relative z-10">
            <div className="mb-8">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="48" stroke={goldColor} strokeWidth="1"/>
                  <path d="M50 2 L50 50 L98 50" stroke={goldColor} strokeWidth="1"/>
                  <circle cx="50" cy="50" r="30" stroke={goldColor} strokeWidth="0.5" opacity="0.5"/>
              </svg>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-lg">
              Global Raya was established in 2018 as a service-based company providing integrated solutions 
              for various development needs. We work with both individual and corporate clients, handling 
              projects of all scales from small to large with a structured and reliable approach.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              As a one-stop solution, Global Raya delivers services ranging from land preparation and civil 
              construction to interior design and IT infrastructure. By managing every stage of the project 
              under one coordinated system, we help clients achieve efficient execution, consistent quality, 
              and ready-to-use results.
            </p>
          </div>
        </section>

        {/* --- SECTION 3: THE WAY WE WORK --- */}
          <section className="bg-white text-black py-32 px-12 md:px-24 min-h-screen relative overflow-hidden pb-48">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 relative z-10">
              <h2 className="text-6xl font-serif">
              The Way <br /> We Work
              </h2>

              <div className="space-y-12">
              {workSteps.map((step, idx) => (
                  <div key={idx} className="border-b border-gray-300 pb-8">
                  <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                  <p className="text-gray-600 max-w-md">{step.desc}</p>
                  </div>
              ))}
              </div>
          </div>

          {/* --- BOTTOM INFINITE MARQUEE --- */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-80 pointer-events-none">
            <div className="marquee-track">
              <span className="marquee-text">
                ONE STEP SOLUTIONS — ONE STEP SOLUTIONS — ONE STEP SOLUTIONS — ONE STEP SOLUTIONS — 
              </span>
              <span className="marquee-text">
                ONE STEP SOLUTIONS — ONE STEP SOLUTIONS — ONE STEP SOLUTIONS — ONE STEP SOLUTIONS — 
              </span>
            </div>
          </div>


          {/* --- STYLE --- */}
          <style dangerouslySetInnerHTML={{ __html: `
            .marquee-track {
              display: flex;
              width: max-content;
              animation: marquee 12s linear infinite;
            }

            .marquee-text {
              font-size: 120px;
              font-weight: 500; /* lebih kurus = lebih tajem */
              white-space: nowrap;

              color: white;

              -webkit-text-stroke: 2px #FFD700; 

              text-shadow: none;
              padding-right: 40px;
              font-weight: 500;
              text-rendering: geometricPrecision;
              -webkit-font-smoothing: none; /* MATIIN SMOOTH */
            }



            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}} />


          </section>


      {/* --- SECTION 4: STATS --- */}
          <section className="relative py-28 border-y border-gray-800 bg-black overflow-hidden">

          {/* BACKGROUND EFFECT - ABSTRACT GOLD LINES WITH GLOW */}
          <div className="absolute inset-0 opacity-40">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFB500', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0.4 }} />
                </linearGradient>
              </defs>
              <path d="M 0 100 Q 300 50 600 150 T 1200 100" stroke="url(#goldGrad)" strokeWidth="8" fill="none" filter="url(#glow)" />
              <path d="M 200 0 Q 500 200 800 100 T 1400 50" stroke="url(#goldGrad)" strokeWidth="6" fill="none" filter="url(#glow)" />
              <path d="M -100 300 Q 400 250 700 350 T 1300 300" stroke="url(#goldGrad)" strokeWidth="10" fill="none" filter="url(#glow)" />
              <line x1="100" y1="0" x2="300" y2="400" stroke="#FFB500" strokeWidth="4" filter="url(#glow)" />
              <line x1="900" y1="0" x2="1100" y2="500" stroke="#FF8C00" strokeWidth="5" filter="url(#glow)" />
            </svg>
          </div>

          {/* --- CONTENT --- */}
          <div className="px-12 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

              <div className="flex items-start gap-6">
              <span className="text-7xl font-light">7+</span>
              <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest leading-tight">
                  Years of experience,<br/>
                  Delivering reliable solutions across projects since 2018.
              </p>
              </div>

              <div className="flex flex-col items-center text-center border-x border-gray-800 px-8">
              <h3 className="text-3xl font-serif mb-2">End-to-end</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest max-w-xs">
                  Integrated solutions. Managing every stage from land preparation to fully functional spaces.
              </p>
              </div>

              <div className="flex items-start gap-6">
              <span className="text-3xl font-serif mb-2">Quality & Reliability</span>
              <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest leading-tight">
                  Committed to consistent results through professional execution and trusted service.
              </p>
              </div>

          </div>

          {/* --- QUOTE --- */}
          <div className="mt-24 text-center px-12 relative z-10">
              <p className="text-2xl md:text-3xl font-serif italic max-w-4xl mx-auto leading-relaxed">
              Our goal is not only to complete projects, but to build long-term trust through{" "}
              <span className="text-gray-400">consistent results and dependable service.</span>
              </p>
          </div>

          </section>



        {/* --- SECTION 5: CLIENTS & CLOSING --- */}
        <section className="py-32 bg-black text-center px-6 md:px-12 relative overflow-hidden">

          {/* GOLD ACCENT BACKDROP */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="glowClient">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="goldClientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB500" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <path d="M 0 200 Q 400 120 900 200 T 1800 160" stroke="url(#goldClientGrad)" strokeWidth="7" fill="none" filter="url(#glowClient)" />
              <path d="M 200 80 Q 700 200 1400 120" stroke="url(#goldClientGrad)" strokeWidth="5" fill="none" filter="url(#glowClient)" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif mb-4 relative z-10">
            Our <span style={{ color: goldColor }}>Client</span>
          </h2>

          <p className="text-gray-500 mb-16 uppercase tracking-widest text-sm relative z-10">
            Trusted by individuals and organizations across various industries.
          </p>
                
          <div className="overflow-hidden mb-32 relative z-10">
            <div className="client-marquee-track">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div key={i} className="client-card">
                  <img 
                    src={`http://localhost:8000/storage/${logo.image_path}`} 
                    alt="Client Logo" 
                    className="w-full h-full object-contain"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            .client-marquee-track {
              display: flex;
              flex-wrap: nowrap;
              width: max-content;
              animation: marquee-scroll 32s linear infinite;
              will-change: transform;
            }

            .client-card {
              width: 140px;
              height: 140px;
              margin: 0 14px;
              flex: 0 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;

              backdrop-filter: blur(18px);
              background: rgba(255,255,255,0.78);
              border: 1px solid rgba(255,255,255,0.5);
              border-radius: 22px;

              box-shadow: 
                0 12px 32px rgba(0,0,0,0.35),
                inset 0 0 0 1px rgba(255,255,255,0.45);

              transition: 
                transform .35s ease,
                box-shadow .35s ease,
                background .35s ease;
            }

            .client-card img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              padding: 14px;
              transition: transform .35s ease;
              pointer-events: none;
            }

            .client-card:hover {
              background: rgba(255,255,255,0.95);
              box-shadow: 
                0 20px 50px rgba(0,0,0,0.4),
                0 0 22px rgba(255,181,0,0.45);
            }

            .client-card:hover img {
              transform: scale(1.18);
            }

            @media (max-width: 768px) {
              .client-card {
                width: 110px;
                height: 110px;
                margin: 0 10px;
              }
            }

            @keyframes marquee-scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}} />

          {/* CLOSING SECTION — TIDAK DIUBAH */}
          <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden rounded-3xl mt-24">
            <img src="/closing-bg.jpg" className="absolute inset-0 w-full h-full object-cover brightness-50" alt="background" />
            <div className="relative z-10 max-w-3xl px-6">
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                Your vision deserves the right partner. <br />
                Let's <span className="italic" style={{ color: goldColor }}>make it happen</span> together.
              </h2>
              <button 
                className="mt-12 relative px-8 py-3 rounded-lg font-semibold text-white text-base transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: `0 0 30px ${goldColor}80, 0 0 60px ${goldColor}40`
                }}
              >
                contact us
              </button>
            </div>
          </div>

        </section>


      </div>
    );
  };

  export default AboutUs;
