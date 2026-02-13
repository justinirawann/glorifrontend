import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ activePage = 'home' }) => {
  const goldColor = "#FFB500";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* LOGO - FIXED LEFT */}
      <div className="fixed top-6 left-6 z-50 font-bold tracking-wide text-lg">
        GLORI
      </div>

      {/* NAVBAR - CENTER */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 bg-transparent">
        <div className="flex items-center gap-8 px-8 py-4 rounded-full">

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <Link 
              to="/"
              className={`transition-all duration-300 hover:scale-105 hover:text-[#FFB500]
                ${activePage === 'home' ? 'border-b pb-1' : ''}`}
              style={activePage === 'home' ? { color: goldColor, borderColor: goldColor } : {}}
            >
              Home
            </Link>

            <Link 
              to="/about"
              className={`transition-all duration-300 hover:scale-105 hover:text-[#FFB500]
                ${activePage === 'about' ? 'border-b pb-1' : ''}`}
              style={activePage === 'about' ? { color: goldColor, borderColor: goldColor } : {}}
            >
              About Us
            </Link>

            <div className="cursor-pointer hover:text-gray-400">Services ▼</div>
            <div className="cursor-pointer hover:text-gray-400">Portfolio ▼</div>

            <button
              className="px-6 py-2 rounded-full font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #FFB500, #FFDFA3)"
              }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-black/95 backdrop-blur-xl px-6 pb-6 space-y-5 text-sm rounded-2xl">
            <Link to="/" className="block hover:text-gray-400">Home</Link>
            <Link to="/about" className="block hover:text-gray-400">About Us</Link>
            <div className="hover:text-gray-400">Services</div>
            <div className="hover:text-gray-400">Portfolio</div>

            <button 
              className="w-full mt-3 text-white px-6 py-2 rounded-full font-bold"
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
