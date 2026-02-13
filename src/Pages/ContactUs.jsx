import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const ContactUs = () => {
  const goldColor = "#FFB500";
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 300) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/contact-messages', {
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
            <path d="M 0 200 Q 400 100 800 250 T 1600 200" stroke="url(#goldGradContact)" strokeWidth="8" fill="none" filter="url(#glowContact)" />
            <path d="M 300 0 Q 600 300 1000 150 T 1800 100" stroke="url(#goldGradContact)" strokeWidth="6" fill="none" filter="url(#glowContact)" />
            <line x1="200" y1="0" x2="400" y2="600" stroke="#FFB500" strokeWidth="4" filter="url(#glowContact)" />
          </svg>
        </div>

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
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-xl">📧</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white">info@globalraya.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-xl">📞</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-white">+62 123 4567 890</p>
                </div>
              </div>
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
