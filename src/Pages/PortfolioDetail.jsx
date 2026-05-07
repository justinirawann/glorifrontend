import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import config from '../config/config';

const PortfolioDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/portfolios/${projectId}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchDetail();
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center font-serif italic text-xl">
      <motion.p animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
        Loading...
      </motion.p>
    </div>
  );

  // Check if images exist
  const hasImages = project.displayed_images && project.displayed_images.length === 5;
  const allImages = project.images || [];
  const displayedIds = project.displayed_images ? project.displayed_images.map(img => img.id) : [];
  const remainingImages = allImages.filter(img => !displayedIds.includes(img.id));
  
  console.log('All images:', allImages.length);
  console.log('Displayed images:', displayedIds.length);
  console.log('Remaining images:', remainingImages.length);
  console.log('Remaining data:', remainingImages);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-yellow-600/30 overflow-x-hidden">
      <Navbar activePage="portfolio" />

      {/* --- BACK BUTTON (TOP LEFT) --- */}
      <div className="fixed top-24 left-8 z-50">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2">
          <motion.span 
            whileHover={{ scale: 1.2 }}
            className="text-xl text-gray-400 group-hover:text-yellow-500 transition-colors duration-300"
          >
            ←
          </motion.span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-yellow-500 transition-colors font-bold">Back</span>
        </button>
      </div>

      {/* --- MODAL (LIGHTBOX) --- */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)} // Klik di mana aja buat tutup
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Tombol Close */}
            <button className="absolute top-10 right-10 text-white/50 hover:text-white text-3xl font-light">
              ×
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={selectedImg}
              alt="Full View"
              className="max-w-full max-h-full object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HEADER --- */}
      <header className="pt-40 pb-20 px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="text-yellow-600 tracking-[0.5em] uppercase text-[10px] mb-4 block font-bold italic">{project.category}</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mb-10 tracking-tighter">{project.name}</h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm font-light leading-relaxed tracking-wide">{project.description}</p>
        </motion.div>
      </header>

      {/* --- BANNER (CLICKABLE) --- */}
      <section className="px-8 md:px-20 mb-20">
        <motion.div 
          onClick={() => setSelectedImg(project.banner_image ? `${config.API_BASE_URL.replace('/api', '')}/storage/${project.banner_image}` : '/test.jpg')}
          className="w-full aspect-[16/7] overflow-hidden bg-zinc-900 shadow-2xl cursor-zoom-in"
        >
          <motion.img 
            whileHover={{ scale: 1.03 }}
            src={project.banner_image ? `${config.API_BASE_URL.replace('/api', '')}/storage/${project.banner_image}` : '/test.jpg'}
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
          />
        </motion.div>
      </section>

      {/* --- ABSTRACT GRID (ALL CLICKABLE) --- */}
      <main className="max-w-7xl mx-auto px-8 pb-40">
        {!hasImages ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8"
            >
              <svg className="w-32 h-32 mx-auto text-yellow-600/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-serif italic text-gray-400 mb-4">Gallery Coming Soon</h3>
            <p className="text-sm text-gray-600 tracking-[0.3em] uppercase">Images are being prepared</p>
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-2 h-2 bg-yellow-600/30 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-600/30 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-yellow-600/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <PhotoBox img={`${config.API_BASE_URL.replace('/api', '')}/storage/${project.displayed_images[0].image_path}`} span="md:col-span-8 aspect-video" onOpen={setSelectedImg} />
            <PhotoBox img={`${config.API_BASE_URL.replace('/api', '')}/storage/${project.displayed_images[1].image_path}`} span="md:col-span-4 aspect-[3/4]" onOpen={setSelectedImg} />
            <PhotoBox img={`${config.API_BASE_URL.replace('/api', '')}/storage/${project.displayed_images[2].image_path}`} span="md:col-start-2 md:col-span-4 aspect-[2/3]" onOpen={setSelectedImg} />
            <PhotoBox img={`${config.API_BASE_URL.replace('/api', '')}/storage/${project.displayed_images[3].image_path}`} span="md:col-span-6 aspect-video" onOpen={setSelectedImg} />
            <PhotoBox img={`${config.API_BASE_URL.replace('/api', '')}/storage/${project.displayed_images[4].image_path}`} span="md:col-start-3 md:col-span-8 aspect-[16/8] mt-10" onOpen={setSelectedImg} />
          </div>
        )}

        {/* --- SEE MORE BUTTON --- */}
        {remainingImages.length > 0 && !showMore && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={() => setShowMore(true)}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:border-yellow-600 group-hover:bg-yellow-600/10 transition-all duration-700">
                <motion.span 
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xl"
                >
                  ↓
                </motion.span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 group-hover:text-yellow-500 transition-colors font-bold">
                See More ({remainingImages.length})
              </span>
            </button>
          </div>
        )}

        {/* --- REMAINING IMAGES GRID --- */}
        <AnimatePresence>
          {showMore && remainingImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {remainingImages.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedImg(`${config.API_BASE_URL.replace('/api', '')}/storage/${image.image_path}`)}
                  className="aspect-[4/3] bg-zinc-900 overflow-hidden cursor-zoom-in group"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={`${config.API_BASE_URL.replace('/api', '')}/storage/${image.image_path}`}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// Komponen Pembantu biar kode lebih bersih
const PhotoBox = ({ img, span, onOpen }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={() => onOpen(img)}
    className={`${span} bg-zinc-900 overflow-hidden cursor-zoom-in group`}
  >
    <motion.img 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.8 }}
      src={img} 
      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
    />
  </motion.div>
);

export default PortfolioDetail;