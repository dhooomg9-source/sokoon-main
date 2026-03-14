import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import QuoteJourney from '../components/QuoteJourney';

export default function ProductsPage() {
  const pageRef = useRef(null);

  const images = {
    product1: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    product2: "https://images.unsplash.com/photo-1522066826130-ab088e894c25?q=80&w=800&auto=format&fit=crop",
    product3: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=800&auto=format&fit=crop",
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
            <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter">Core Products</h1>
            <p className="font-data text-dark/70 mt-6 max-w-3xl text-lg md:text-xl leading-relaxed">
              Industrial-grade components designed, milled, and tested for maximum sound attenuation in hostile acoustic environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: 'WavePanel Pro', tag: 'Absorption', desc: 'High-density geometric diffusers with mathematically modeled surface areas to scatter rogue soundwaves.', img: images.product1 },
              { title: 'SilentPod Max', tag: 'Isolation', desc: 'Freestanding 4-person acoustic meeting cell with active ventilation silencing and total frequency blockage.', img: images.product2 },
              { title: 'SoundBarrier Elite', tag: 'Constraint', desc: 'Mass-loaded vinyl core wall partitions achieving STC-65 ratings for extreme isolation.', img: images.product3 }
            ].map((prod, i) => (
              <div key={i} className="reveal-block group p-5 bg-paper border border-dark/5 rounded-[2rem] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500">
                <div className="h-56 md:h-64 w-full rounded-[1.5rem] mb-6 bg-dark/5 transition-all duration-700"></div>
                <div className="px-2 pb-4">
                  <span className="font-data text-xs px-3 py-1 bg-accent/10 text-accent rounded-full uppercase mb-4 inline-block font-bold">{prod.tag}</span>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-3">{prod.title}</h3>
                  <p className="font-data text-dark/70 text-sm leading-relaxed">{prod.desc}</p>
                  <button className="mt-6 font-heading font-bold text-accent text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-4 transition-all">
                    Initialize Specs <span className="bg-accent w-6 h-[2px] block group-hover:w-16 transition-all duration-500"></span>
                  </button>
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
