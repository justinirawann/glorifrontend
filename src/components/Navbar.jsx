import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ activePage = 'home' }) => {
  const goldColor = "#FFB500";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-gray-800">
      <div className="flex items-center justify-between py-5 px-6 md:px-12">

        {/* LOGO */}
        <div className="font-bold tracking-wide text-lg">
          GLORI
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          <Link 
            to="/" 
            className={activePage === 'home' ? 'border-b pb-1' : 'hover:text-gray-400'}
            style={activePage === 'home' ? { color: goldColor, borderColor: goldColor } : {}}
          >
            Home
          </Link>

          <Link 
            to="/about" 
            className={activePage === 'about' ? 'border-b pb-1' : 'hover:text-gray-400'}
            style={activePage === 'about' ? { color: goldColor, borderColor: goldColor } : {}}
          >
            About Us
          </Link>

          <div className="cursor-pointer hover:text-gray-400">Services ▼</div>
          <div className="cursor-pointer hover:text-gray-400">Portfolio ▼</div>

          <button 
            className="text-black px-6 py-2 rounded-full font-bold hover:brightness-110 transition"
            style={{ backgroundColor: goldColor }}
          >
            Contact us
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
        <div className="md:hidden bg-black/95 backdrop-blur-xl px-6 pb-6 space-y-5 text-sm border-t border-gray-800">
          <Link to="/" className="block hover:text-gray-400">Home</Link>
          <Link to="/about" className="block hover:text-gray-400">About Us</Link>
          <div className="hover:text-gray-400">Services</div>
          <div className="hover:text-gray-400">Portfolio</div>

          <button 
            className="w-full mt-3 text-black px-6 py-2 rounded-full font-bold"
            style={{ backgroundColor: goldColor }}
          >
            Contact us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
