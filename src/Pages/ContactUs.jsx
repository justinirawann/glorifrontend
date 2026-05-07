import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import config from '../config/config';

const ContactUs = () => {
  const goldColor = "#FFB500";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/contact-info`);
        const data = await response.json();
        setContactInfo(data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 300) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${config.API_BASE_URL}/contact-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Thank you! We will contact you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white font-sans min-h-screen">
      <Navbar activePage="contact" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 overflow-hidden">
        
        {/* BACKGROUND EFFECT */}
        <div className="absolute inset-0 opacity-30">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="glowContact">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="goldGradContact" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FFB500', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 0.4 }} />
              </linearGradient>
            </defs>
            <path className="animate-contact-1" d="M 0 200 Q 400 100 800 250 T 1600 200" stroke="url(#goldGradContact)" strokeWidth="8" fill="none" filter="url(#glowContact)" />
            <path className="animate-contact-2" d="M 300 0 Q 600 300 1000 150 T 1800 100" stroke="url(#goldGradContact)" strokeWidth="6" fill="none" filter="url(#glowContact)" />
            <line className="animate-contact-3" x1="200" y1="0" x2="400" y2="600" stroke="#FFB500" strokeWidth="4" filter="url(#glowContact)" />
          </svg>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes contact-move-1 {
            0%, 100% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(40px) translateY(-20px); }
            50% { transform: translateX(0) translateY(20px); }
            75% { transform: translateX(-40px) translateY(-10px); }
          }
          @keyframes contact-move-2 {
            0%, 100% { transform: translateY(0) translateX(0); }
            33% { transform: translateY(30px) translateX(-30px); }
            66% { transform: translateY(-30px) translateX(30px); }
          }
          @keyframes contact-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.9; }
          }
          .animate-contact-1 {
            animation: contact-move-1 12s ease-in-out infinite;
          }
          .animate-contact-2 {
            animation: contact-move-2 15s ease-in-out infinite;
          }
          .animate-contact-3 {
            animation: contact-pulse 4s ease-in-out infinite;
          }
        `}} />

        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT - TEXT */}
          <div data-aos="fade-right">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight mb-6">
              Let's Build <br />
              <span 
                className="italic bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #FFB500, #FFDFA3)" }}
              >
                Something Great
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Have a project in mind? We're here to turn your vision into reality. 
              Share your ideas with us and let's start the conversation.
            </p>

            {/* CONTACT INFO */}
            <div className="mt-12 space-y-4">
              {contactInfo?.email && (
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FFB500]/10 transition-colors">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-white group-hover:text-[#FFB500] transition-colors">{contactInfo.email_name}</p>
                  </div>
                </a>
              )}
              {contactInfo?.whatsapp && (
                <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FFB500]/10 transition-colors">
                    <svg className="w-6 h-6 text-white group-hover:text-[#FFB500] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="text-white group-hover:text-[#FFB500] transition-colors">{contactInfo.whatsapp_name}</p>
                  </div>
                </a>
              )}
              {contactInfo?.instagram && (
                <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FFB500]/10 transition-colors">
                    <svg className="w-6 h-6 text-white group-hover:text-[#FFB500] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instagram</p>
                    <p className="text-white group-hover:text-[#FFB500] transition-colors">{contactInfo.instagram_name}</p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div 
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB500] transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB500] transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB500] transition-all"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Message ({formData.message.length}/300)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  maxLength="300"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FFB500] transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #FFB500, #FFDFA3)" }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto" data-aos="zoom-in">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Visit Our <span style={{ color: goldColor }}>Office</span>
          </h2>
          <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7649191543455!2d106.82016639999999!3d-6.1622300999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5b49de69777%3A0x83b7d59935ccbd20!2sClipArt%20Interior!5e0!3m2!1sen!2sid!4v1770898651812!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;
