import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import QuoteJourney from '../components/QuoteJourney';

export default function WhyChoosePage() {
  const pageRef = useRef(null);
  // Images removed per request

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
          <div className="mb-12 reveal-block border-b border-dark/10 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="font-data text-accent uppercase tracking-widest text-xs mb-3 block">03 // The Advantage</span>
              <h1 className="font-heading font-bold text-5xl md:text-7xl uppercase tracking-tighter">
                Why Choose <br/><span className="text-accent font-drama italic">Sokoon.</span>
              </h1>
            </div>
            <p className="font-body text-lg md:text-xl leading-relaxed max-w-2xl text-dark/80">
              Middle East's leading provider. We deliver superior sound control through innovative design, premium materials, and expert installation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-dark mt-16 mb-16">
            
            <div className="lg:col-span-5 flex flex-col justify-center gap-6 reveal-block">
              <div className="w-full h-72 rounded-[2rem] bg-dark/5 mb-4 shadow-xl"></div>
              <div className="p-8 bg-dark text-paper rounded-[2rem] shadow-xl">
                <h4 className="font-heading text-xs text-paper/50 uppercase tracking-widest mb-4">Mission Statement</h4>
                <p className="font-drama italic text-3xl text-paper leading-tight">
                  "To deliver reliable, intelligent, and user-centered acoustic interventions that build lasting structural enhancements."
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { title: 'Integrity', desc: 'Honest, ethical, and accountable in every technical recommendation and acoustic measurement.' },
                { title: 'Innovation', desc: 'Utilizing next-generation acoustic mapping algorithms and bleeding-edge material science.' },
                { title: 'Collaboration', desc: 'Integrating seamlessly with your architects, GC teams, and internal stakeholders.' },
                { title: 'Excellence', desc: 'ISO-certified standards ensuring total operational perfection from blueprint to deployment.' }
              ].map((val, i) => (
                <div key={i} className="reveal-block border-t-2 border-dark/10 pt-8 flex flex-col">
                  <div className="font-data text-accent font-bold mb-4 tracking-tighter text-4xl leading-none">0{i+1}</div>
                  <h4 className="font-heading font-bold text-3xl mb-4">{val.title}</h4>
                  <p className="font-data text-base opacity-70 leading-relaxed max-w-xs">{val.desc}</p>
                </div>
              ))}

              <div className="sm:col-span-2 mt-8 pt-12 border-t border-dark/10 reveal-block">
                <h4 className="font-heading font-bold text-2xl mb-8 uppercase tracking-wider">Target Ecosystems</h4>
                <div className="flex flex-wrap gap-4 font-data">
                  {[
                    'Retail Environments', 'Educational Facilities', 'Commercial Real Estate',
                    'Industrial Manufacturing', 'High-Security Finance', 'Medical & Healthcare'
                  ].map((sector, i) => (
                    <div key={i} className="bg-paper px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-dark border border-dark/5 shadow-sm">
                      {sector}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuoteJourney />
    </div>
  );
}
