import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import QuoteJourney from '../components/QuoteJourney';

export default function ServicesPage() {
  const pageRef = useRef(null);

  const images = {
    testing: "https://images.unsplash.com/photo-1541888085922-8178125868bf?q=80&w=1200&auto=format&fit=crop",
    paneling: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    masking: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
    booth: "https://images.unsplash.com/photo-1542406775-1facd50ceeb9?q=80&w=1200&auto=format&fit=crop",
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-block", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full flex flex-col pt-24 relative overflow-hidden bg-background">
      {/* Thematic Background Removed */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-transparent w-full flex flex-col items-center relative z-20">
        <div className="w-full max-w-6xl">
          <div className="mb-12 reveal-block border-b border-dark/10 pb-8">
            <span className="font-data text-accent uppercase tracking-widest text-xs mb-3 block">01 // Protocol Definition</span>
            <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter">Acoustic Services</h1>
            <p className="font-data text-dark/70 mt-6 max-w-3xl text-lg md:text-xl leading-relaxed">
              Deploying tailored acoustic protocols across assessment, manufacturing, installation, and optimization. We analyze your spatial constraints and deliver absolute sonic equilibrium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { title: 'Assessment & Testing', desc: 'Precision SPL reading and RT60 reverberation analysis protocols using advanced mic arrays.', img: images.testing },
              { title: 'Acoustic Paneling', desc: 'Architectural-grade absorbers designed to kill rogue frequencies and standing waves.', img: images.paneling },
              { title: 'Sound Masking', desc: 'Active white-noise emitters calibrated to blend into the human auditory threshold for absolute corporate privacy.', img: images.masking },
              { title: 'Isolated Booths', desc: 'Standalone silence chambers engineered for absolute sensory deprivation and secure communications.', img: images.booth }
            ].map((srv, i) => (
              <div key={i} className="reveal-block group relative rounded-[2rem] overflow-hidden bg-dark h-[350px] md:h-[400px] flex items-end w-full shadow-2xl">
                <div className="absolute inset-0 bg-dark opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent"></div>
                <div className="relative z-10 p-10 w-full transform group-hover:-translate-y-4 transition-transform duration-500">
                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-paper mb-3 flex justify-between items-center w-full">
                    {srv.title} <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-accent w-8 h-8" />
                  </h3>
                  <p className="font-data text-paper/70 text-sm md:text-base max-w-md leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <QuoteJourney />
    </div>
  );
}
