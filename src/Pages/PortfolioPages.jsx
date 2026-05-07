import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import config from '../config/config';

const PortfolioPages = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceRes = await fetch(`${config.API_BASE_URL}/services/${serviceId}`);
        const serviceData = await serviceRes.json();
        setService(serviceData);
        const portfolioRes = await fetch(`${config.API_BASE_URL}/services/${serviceId}/portfolios`);
        const portfolioData = await portfolioRes.json();
        setPortfolios(portfolioData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchServiceData();
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-serif italic text-xl">
        <motion.p animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
          Loading...
        </motion.p>
      </div>
    );
  }

  const allProjects = portfolios.length > 0 
    ? portfolios.map(p => ({
        id: p.id,
        title: p.name,
        category: p.category ? p.category.toLowerCase() : 'residence',
        imageUrl: p.banner_image ? `${config.API_BASE_URL.replace('/api', '')}/storage/${p.banner_image}` : '/test.jpg',
        desc: p.description || "Detail pengerjaan interior dengan fokus pada fungsionalitas dan estetika."
      }))
    : [];

  // Get unique categories from actual portfolios
  const availableCategories = allProjects.length > 0
    ? ['all', ...new Set(allProjects.map(p => p.category))]
    : [];

  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-yellow-600/30 min-h-screen overflow-x-hidden">
      <Navbar activePage="portfolio" />
      
      {/* --- HEADER TITLE (CENTERED) --- */}
      <header className="pt-48 pb-20 px-8 md:px-20 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-yellow-600 tracking-[0.5em] uppercase text-[10px] mb-6 block italic">Portfolio Collection</span>
            <h1 className="text-6xl md:text-9xl font-serif italic leading-none tracking-tighter">
              {service.name}
            </h1>
            <div className="w-24 h-[1px] bg-yellow-900/40 mx-auto mt-12"></div>
          </motion.div>
        </div>
      </header>

      {/* --- PROJECTS SECTION --- */}
      <section className="px-8 md:px-20 py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* CATEGORY FILTER (CENTERED) */}
          {availableCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-32">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative group pb-2"
                >
                  <span className={`text-[10px] tracking-[0.4em] uppercase transition-all duration-500 ${
                    activeCategory === cat ? 'text-yellow-500 font-bold' : 'text-gray-500 hover:text-white'
                  }`}>
                    {cat}
                  </span>
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="filterUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-yellow-600 mx-auto w-full"
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* PROJECT GRID OR EMPTY STATE */}
          {allProjects.length === 0 ? (
            // Empty State
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center py-32 max-w-2xl mx-auto"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-12 relative"
              >
                <div className="w-32 h-32 border-2 border-yellow-600/30 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 border-2 border-yellow-600/50 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-yellow-600/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-yellow-600/10 rounded-full blur-2xl"
                />
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-serif italic text-gray-300 mb-6 text-center"
              >
                No Portfolio Yet
              </motion.h3>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 text-center"
              >
                <p className="text-sm text-gray-500 tracking-[0.2em] uppercase">
                  We're currently working on amazing projects
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-16 h-[1px] bg-yellow-800/30"></div>
                  <span className="text-xs text-gray-600 italic">Coming Soon</span>
                  <div className="w-16 h-[1px] bg-yellow-800/30"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12"
              >
                <Link 
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-yellow-600/30 hover:border-yellow-600 transition-all duration-500"
                >
                  <span className="text-xs tracking-[0.3em] uppercase text-gray-400 group-hover:text-yellow-500 transition-colors">
                    Contact Us
                  </span>
                  <motion.span 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-gray-400 group-hover:text-yellow-500 transition-colors"
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          ) : filteredProjects.length === 0 ? (
            // No Results for Filter
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <p className="text-2xl font-serif italic text-gray-500 mb-4">No projects in this category</p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="text-xs tracking-[0.3em] uppercase text-yellow-600 hover:text-yellow-500 transition-colors"
              >
                View All Projects
              </button>
            </motion.div>
          ) : (
            // PROJECT GRID
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProjects.map((project) => (
                  <Link 
                    key={project.title}
                    to={`/portfolio/detail/${project.id}`}
                  >
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="group flex flex-col items-center text-center cursor-pointer"
                    >
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900 border border-white/5">
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 1.5 }}
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>
                    
                    {/* Text Content (Centered) */}
                    <div className="mt-10 space-y-4 flex flex-col items-center max-w-lg">
                      <p className="text-yellow-600 text-[9px] tracking-[0.3em] uppercase font-bold">{project.category}</p>
                      <h4 className="text-4xl font-serif italic group-hover:text-yellow-500 transition-colors duration-500 leading-tight">
                          {project.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">
                        {project.desc}
                      </p>
                      
                      {/* Circle Arrow (Centered Below Text) */}
                      <div className="pt-4">
                        <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-yellow-600 group-hover:text-yellow-500 transition-all duration-500 group-hover:scale-110">
                          →
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* FOOTER (CENTERED) */}
      <footer className="py-24 text-center border-t border-white/5 bg-[#050505]">
        <p className="text-[9px] tracking-[1.2em] uppercase text-gray-700 font-light">
          © 2026 GLOBAL RAYA • ESTABLISHING EXCELLENCE
        </p>
      </footer>
    </div>
  );
};

export default PortfolioPages;