import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TestimoniPages = () => {
  const goldColor = "#FFB500";
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/testimonials')
      .then(r => r.json())
      .then(data => setTestimonials(data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const StarIcon = ({ fill }) => {
    const id = `star-${Math.random().toString(36).substr(2, 9)}`;
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={id}>
            <stop offset={`${fill * 100}%`} stopColor={goldColor} />
            <stop offset={`${fill * 100}%`} stopColor="#2a2a2a" />
          </linearGradient>
        </defs>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#${id})`} />
      </svg>
    );
  };

  const Stars = ({ rating }) => (
    <div className="flex gap-[2px]">
      {[1,2,3,4,5].map(i => (
        <StarIcon key={i} fill={Math.min(1, Math.max(0, parseFloat(rating) - (i - 1)))} />
      ))}
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Navbar activePage="testimoni" />

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-20 px-6 md:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glowT"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <linearGradient id="goldT" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFB500', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <path d="M 0 150 Q 400 80 900 180 T 1800 120" stroke="url(#goldT)" strokeWidth="6" fill="none" filter="url(#glowT)" />
            <path d="M 200 0 Q 600 200 1200 100 T 1800 50" stroke="url(#goldT)" strokeWidth="4" fill="none" filter="url(#glowT)" />
          </svg>
        </div>
        <p className="text-xs md:text-sm uppercase tracking-widest text-[#FFB500] mb-3 relative z-10">Testimoni</p>
        <h1 className="text-4xl md:text-7xl font-serif max-w-3xl leading-tight relative z-10">
          Apa kata <span className="italic" style={{ backgroundImage: 'linear-gradient(135deg, #FFB500, #FFDFA3)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>klien</span> kami
        </h1>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-24 pb-24">
        {isLoading ? (
          <div className="text-center text-gray-500 py-20">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-500 py-20">Belum ada testimoni.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="group flex flex-col border border-white/[0.08] hover:border-[#FFB500]/40 transition-all duration-300 overflow-hidden"
                style={{ background: 'linear-gradient(160deg, rgba(255,181,0,0.06) 0%, rgba(10,10,10,1) 60%)', borderRadius: '6px' }}
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                {/* TOP BAR */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/5 gap-2">
                  <span className="text-[10px] uppercase tracking-widest font-medium px-2 py-[3px] rounded-full border border-[#FFB500]/25 text-[#FFB500] truncate min-w-0">
                    {t.portfolio ? t.portfolio.name : t.industry}
                  </span>
                  <div className="flex-shrink-0">
                    <Stars rating={t.rating} />
                  </div>
                </div>

                {/* BODY */}
                <div className="px-4 pt-3 pb-2 flex flex-col gap-2 flex-1 min-h-0">
                  <p className="text-white font-bold text-sm leading-snug flex-shrink-0">
                    {t.title.toUpperCase()}
                  </p>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-gray-500 text-xs leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                      "{t.description}"
                    </p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FFB500, #FFDFA3)' }}
                    >
                      {t.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight truncate">{t.name}</p>
                      <p className="text-gray-600 text-[10px] uppercase tracking-wider truncate">{t.industry}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-gray-700 text-[10px]">
                      {new Date(t.project_date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                    </p>
                    {t.portfolio && (
                      <Link
                        to={`/portfolio/detail/${t.portfolio.id}`}
                        className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 block"
                        style={{ color: goldColor }}
                      >
                        Lihat Proyek →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TestimoniPages;
