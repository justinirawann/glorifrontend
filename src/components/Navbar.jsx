import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ activePage = 'home' }) => {
  const goldColor = "#FFB500";

  return (
    <nav className="relative z-20 flex items-center justify-center py-6 px-12 border-b border-gray-800">
      <div className="flex space-x-8 text-sm font-medium items-center">
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
        <div className="flex items-center cursor-pointer hover:text-gray-400">
          Services <span className="ml-1 text-[10px]">▼</span>
        </div>
        <div className="flex items-center cursor-pointer hover:text-gray-400">
          Portfolio <span className="ml-1 text-[10px]">▼</span>
        </div>
        <button 
          className="text-black px-6 py-2 rounded-full font-bold transition-all hover:brightness-110"
          style={{ backgroundColor: goldColor }}
        >
          Contact us
        </button>
      </div>

      <div className="absolute right-12 flex items-center space-x-2 text-xs">
        <span className="opacity-50">🌐</span>
        <span className="font-bold">en</span>
        <span className="text-gray-600">|</span>
        <span className="text-gray-500">id</span>
      </div>
    </nav>
  );
};

export default Navbar;
