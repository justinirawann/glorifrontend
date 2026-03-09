import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const ServicesPages = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  
  // State untuk Filter Kategori
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Ambil unique categories dari portfolios yang ada
  const categories = portfolios.length > 0
    ? ['all', ...new Set(portfolios.map(p => p.category.toLowerCase()))]
    : ['all', 'office', 'residence', 'store', 'public'];

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/services/${id}`);
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.log('Error fetching service:', error);
      }
    };

    const fetchPortfolios = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/services/${id}/portfolios`);
        const data = await response.json();
        setPortfolios(data);
      } catch (error) {
        console.log('Error fetching portfolios:', error);
      }
    };

    fetchService();
    fetchPortfolios();
  }, [id]);

  if (!service) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center font-serif italic text-xl">
        <motion.p animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
          Loading...
        </motion.p>
      </div>
    );
  }

  // Data Dummy yang menyertakan kategori untuk testing filter
  const dummyProjects = [
    { title: "Pacific Garden Apartment", category: "residence", imageUrl: "/test.jpg" },
    { title: "Modern Tech Office", category: "office", imageUrl: "/test.jpg" },
    { title: "Minimalist Retail Store", category: "store", imageUrl: "/test.jpg" },
    { title: "City Public Library", category: "public", imageUrl: "/test.jpg" },
    { title: "Cozy Executive Suite", category: "residence", imageUrl: "/test.jpg" },
    { title: "Creative Hub Space", category: "office", imageUrl: "/test.jpg" },
  ];

  // Mapping Data Portofolio dari API atau Dummy
  const allProjects = portfolios.length > 0 
    ? portfolios.map(p => ({
        id: p.id,
        title: p.name,
        category: p.category ? p.category.toLowerCase() : 'residence',
        imageUrl: `http://localhost:8000/storage/${p.banner_image}`
      }))
    : [];

  // Logika Filtering
  const filteredProjects = activeCategory === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  // Limit to 6 projects
  const displayedProjects = filteredProjects.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-yellow-600/30 min-h-screen overflow-x-hidden">
      <Navbar activePage="services" />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-end p-8 md:p-20 overflow-hidden pt-24">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={service.banner_image ? `http://localhost:8000/storage/${service.banner_image}` : '/test.jpg'}
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <motion.h1 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative text-7xl md:text-[11rem] font-serif italic leading-none tracking-tighter mb-10"
        >
          {service.name}
        </motion.h1>
      </section>

      {/* --- CONTENT AREA (Description & Process) --- */}
      <div className="relative">
        <motion.div animate={{ opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <section className="px-8 md:px-20 py-24 relative z-10 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="max-w-xl border-l border-yellow-800/30 pl-8">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-gray-300 leading-loose text-justify italic font-light">
                {service.description}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.4 }} className="flex lg:justify-end">
              <button onClick={() => document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' })} className="group flex items-center gap-3 transition-all duration-300">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-serif italic text-gray-300 group-hover:text-white">find our projects</span>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} className="h-[1px] bg-gray-500 mt-1 group-hover:bg-white transition-colors" />
                </div>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-xl text-gray-400 group-hover:text-white">→</motion.span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* --- PROCESS SECTION --- */}
        <section className="px-8 md:px-20 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} className="lg:sticky lg:top-32">
              <div className="group cursor-pointer inline-flex items-center gap-6">
                <h2 className="text-5xl font-serif tracking-wide italic">Our Process</h2>
                <motion.div initial={{ width: 0 }} whileInView={{ width: 80 }} transition={{ duration: 1 }} className="h-[1px] bg-yellow-600/50" />
                <span className="text-3xl group-hover:translate-x-4 transition-transform duration-500">→</span>
              </div>
            </motion.div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: false }} className="space-y-0">
              {[
                { title: "Concept and Planning", desc: "Every project starts with structured planning to ensure clarity, efficiency, and quality." },
                { title: "Design Development", desc: "Developing layouts, materials, and visual concepts." },
                { title: "Execution and Coordination", desc: "Coordinating implementation to ensure accuracy and quality." },
                { title: "Final Delivery", desc: "Delivering a ready-to-use space aligned with the design plans." },
              ].map((item, index) => (
                <motion.div key={index} variants={itemVariants} className="border-t border-white/10 py-12 group hover:bg-white/[0.02] transition-colors px-6">
                  <div className="flex items-start gap-6">
                    <span className="text-yellow-700 font-serif text-sm mt-2">0{index + 1}</span>
                    <div>
                      <h3 className="text-2xl font-serif text-gray-200 group-hover:text-yellow-500 transition-colors duration-500">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-4 max-w-lg leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects-section" className="px-8 md:px-20 py-32 bg-[#080808]">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} 
            className="text-6xl font-serif mb-6 italic tracking-tight"
          >
            Our Projects
          </motion.h2>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-yellow-700/50"></div>
            <p className="text-[10px] text-gray-500 tracking-[0.4em] uppercase">Completed Masterpieces</p>
            <div className="w-12 h-[1px] bg-yellow-700/50"></div>
          </div>

          {/* --- CATEGORY FILTER --- */}
          {allProjects.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative group py-2"
                >
                  <span className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                    activeCategory === cat ? 'text-yellow-500 font-bold' : 'text-gray-500 group-hover:text-white'
                  }`}>
                    {cat}
                  </span>
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="underline" 
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-yellow-500"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid Projects atau Empty State */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
              No Projects Yet
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
          // Projects Grid
          <motion.div 
            layout
            variants={containerVariants} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: false }} 
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 max-w-7xl mx-auto"
          >
            <AnimatePresence mode='popLayout'>
              {displayedProjects.map((project, idx) => (
                <Link 
                  key={`${project.title}-${idx}`}
                  to={`/portfolio/detail/${project.id}`}
                >
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -10 }} 
                    className="group relative cursor-pointer"
                  >
                  <div className="aspect-[16/10] overflow-hidden border border-white/5 bg-zinc-900">
                    <motion.img 
                      whileHover={{ scale: 1.1 }} 
                      transition={{ duration: 1.2 }} 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
                    />
                  </div>
                  <div className="mt-8 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-yellow-600 font-bold tracking-[0.2em] uppercase">{project.category}</span>
                      <h4 className="text-3xl font-serif mt-2 italic group-hover:text-yellow-500 transition-colors duration-300">{project.title}</h4>
                    </div>
                    <motion.div whileHover={{ x: 5 }} className="text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300">→</motion.div>
                  </div>
                  <div className="absolute -bottom-4 left-0 w-0 h-[1px] bg-yellow-800/40 group-hover:w-full transition-all duration-700"></div>
                </motion.div>
              </Link>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* See More Button */}
        {allProjects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="flex justify-center mt-20"
          >
            <Link 
              to={`/portfolio/${id}`}
              className="group inline-flex items-center gap-4 px-10 py-5 border border-yellow-600/30 hover:border-yellow-600 transition-all duration-500 hover:bg-yellow-600/5"
            >
              <span className="text-xs tracking-[0.3em] uppercase text-gray-400 group-hover:text-yellow-500 transition-colors">
                See More Projects
              </span>
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-lg text-gray-400 group-hover:text-yellow-500 transition-colors"
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="py-20 text-center border-t border-white/5">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} className="text-[9px] tracking-[0.6em] uppercase text-gray-600">
          © 2026 Global Raya • Architecture & IT Solutions
        </motion.p>
      </footer>
    </div>
  );
};

export default ServicesPages;