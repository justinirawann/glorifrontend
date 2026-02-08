import React from "react";

const SimpleGoldSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">

      {/* BACKGROUND EFFECT */}
      <style dangerouslySetInnerHTML={{ __html: `
        .soft-yellow-blur {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 15% 25%, rgba(255, 200, 80, 0.18), transparent 45%),
            radial-gradient(circle at 85% 70%, rgba(255, 180, 50, 0.14), transparent 50%);
          filter: blur(120px);
          z-index: -1;
        }

        .line-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            120deg,
            rgba(255,255,255,0.035) 0px,
            rgba(255,255,255,0.035) 1px,
            transparent 1px,
            transparent 10px
          );
          opacity: 0.35;
          pointer-events: none;
          z-index: -1;
        }
      `}} />

      {/* BG LAYERS */}
      <div className="absolute inset-0 -z-10">
        <div className="soft-yellow-blur"></div>
        <div className="line-overlay"></div>
      </div>


    </section>
  );
};

export default SimpleGoldSection;
