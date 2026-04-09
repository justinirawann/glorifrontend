import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ activePage = 'home', isDark = false }) => {
  const goldColor = "#FFB500";
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [services, setServices] = useState([]);
  
  const textColor = isDark ? 'text-black' : 'text-white';
  const hoverColor = isDark ? 'hover:text-[#FFB500]' : 'hover:text-[#FFB500]';
  const dropdownBg = isDark ? 'bg-white/90' : 'bg-black/40';
  const dropdownText = isDark ? 'text-black' : 'text-white';
  const dropdownBorder = isDark ? 'border-black/20' : 'border-white/20';
  const mobileText = isDark ? 'text-black' : 'text-white';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.log('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <>
      {/* LOGO - Pojok Kiri */}
      <div className="fixed top-6 left-6 z-50">
        <img src={isDark ? '/logo2.PNG' : '/logo.PNG'} alt="Logo" className="h-20 w-auto" />
      </div>

      {/* NAVBAR CONTAINER */}
      <nav className={`fixed top-6 z-50 transition-all duration-300 
        right-6 md:right-auto md:left-1/2 md:-translate-x-1/2 
        ${menuOpen ? 'w-[70vw] md:w-auto' : 'w-auto'}`}>
        
        <div className="flex items-center justify-end md:justify-center gap-8 md:px-8 md:py-4 rounded-full">

          {/* MOBILE BUTTON - Pojok Kanan */}
          <button 
            onClick={() => {
              setMenuOpen(!menuOpen);
              setServicesOpen(false); // Reset dropdown saat menu ditutup
              setPortfolioOpen(false);
            }} 
            className={`md:hidden text-3xl ${textColor} p-2 rounded-lg`}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          {/* DESKTOP MENU */}
          <div className={`hidden md:flex space-x-8 text-sm font-medium items-center ${textColor}`}>
            <Link 
              to="/"
              className={`transition-all duration-300 hover:scale-105 ${hoverColor}
                ${activePage === 'home' ? 'border-b pb-1' : ''}`}
              style={activePage === 'home' ? { color: goldColor, borderColor: goldColor } : {}}
            >
              Home
            </Link>

            <Link 
              to="/about"
              className={`transition-all duration-300 hover:scale-105 ${hoverColor}
                ${activePage === 'about' ? 'border-b pb-1' : ''}`}
              style={activePage === 'about' ? { color: goldColor, borderColor: goldColor } : {}}
            >
              About Us
            </Link>

            <Link 
              to="/testimoni"
              className={`transition-all duration-300 hover:scale-105 ${hoverColor}
                ${activePage === 'testimoni' ? 'border-b pb-1' : ''}`}
              style={activePage === 'testimoni' ? { color: goldColor, borderColor: goldColor } : {}}
            >
              Testimoni
            </Link>

            {/* Dropdown Services Desktop */}
            <div className="relative z-50">
              <div 
                className={`cursor-pointer ${hoverColor} transition-all duration-300 ${
                  activePage === 'services' ? 'border-b pb-1' : ''
                }`}
                style={activePage === 'services' ? { color: goldColor, borderColor: goldColor } : {}}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services ▼
              </div>
              {servicesOpen && services.length > 0 && (
                <div className={`absolute top-full mt-2 backdrop-blur-md ${dropdownBg} rounded-xl py-3 min-w-[220px] shadow-2xl z-50 border ${dropdownBorder}`}>
                  {services.map((service) => (
                    <Link 
                      key={service.id} 
                      to={`/services/${service.id}`}
                      onClick={() => setServicesOpen(false)}
                      className={`block px-5 py-3 hover:bg-white/10 cursor-pointer transition-all ${dropdownText} hover:text-[#FFB500] border-l-2 border-transparent hover:border-[#FFB500]`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Dropdown Portfolio Desktop */}
            <div className="relative z-50">
              <div 
                className={`cursor-pointer ${hoverColor} transition-all duration-300 ${
                  activePage === 'portfolio' ? 'border-b pb-1' : ''
                }`}
                style={activePage === 'portfolio' ? { color: goldColor, borderColor: goldColor } : {}}
                onClick={() => setPortfolioOpen(!portfolioOpen)}
              >
                Portfolio ▼
              </div>
              {portfolioOpen && services.length > 0 && (
                <div className={`absolute top-full mt-2 backdrop-blur-md ${dropdownBg} rounded-xl py-3 min-w-[220px] shadow-2xl z-50 border ${dropdownBorder}`}>
                  {services.map((service) => (
                    <Link 
                      key={service.id} 
                      to={`/portfolio/${service.id}`}
                      onClick={() => setPortfolioOpen(false)}
                      className={`block px-5 py-3 hover:bg-white/10 cursor-pointer transition-all ${dropdownText} hover:text-[#FFB500] border-l-2 border-transparent hover:border-[#FFB500]`}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              className="px-6 py-2 rounded-full font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #FFB500, #FFDFA3)" }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* MOBILE MENU CONTENT - TRANSPARAN & ACCORDION STYLE */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-transparent px-2 py-4 space-y-4 text-right">
            <Link to="/" onClick={() => setMenuOpen(false)} className={`block ${mobileText} text-lg font-medium drop-shadow-md`}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className={`block ${mobileText} text-lg font-medium drop-shadow-md`}>About Us</Link>
            <Link to="/testimoni" onClick={() => setMenuOpen(false)} className={`block ${mobileText} text-lg font-medium drop-shadow-md`}>Testimoni</Link>
            
            {/* Services Mobile Dropdown */}
            <div>
              <div 
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`${mobileText} text-lg font-medium drop-shadow-md cursor-pointer flex justify-end items-center gap-2`}
              >
                Services {servicesOpen ? '▲' : '▼'}
              </div>
              {servicesOpen && (
                <div className={`mt-2 space-y-3 pr-4 transition-all border-r ${dropdownBorder}`}>
                  {services.map(s => (
                    <Link key={s.id} to={`/services/${s.id}`} onClick={() => setMenuOpen(false)} className={`block text-sm ${isDark ? 'text-black/80' : 'text-white/80'}`}>{s.name}</Link>
                  ))}
                </div>
              )}
            </div>

            {/* Portfolio Mobile Dropdown */}
            <div>
              <div 
                onClick={() => setPortfolioOpen(!portfolioOpen)}
                className={`${mobileText} text-lg font-medium drop-shadow-md cursor-pointer flex justify-end items-center gap-2`}
              >
                Portfolio {portfolioOpen ? '▲' : '▼'}
              </div>
              {portfolioOpen && (
                <div className={`mt-2 space-y-3 pr-4 transition-all border-r ${dropdownBorder}`}>
                  {services.map(s => (
                    <Link key={s.id} to={`/portfolio/${s.id}`} onClick={() => setMenuOpen(false)} className={`block text-sm ${isDark ? 'text-black/80' : 'text-white/80'}`}>{s.name}</Link>
                  ))}
                </div>
              )}
            </div>

            <button 
              className="w-full text-white px-6 py-3 rounded-full font-bold shadow-lg mt-4"
              style={{ background: "linear-gradient(135deg, #FFB500, #FFDFA3)" }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;