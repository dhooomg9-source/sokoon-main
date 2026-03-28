import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RotatingMotif = () => (
  <div className="w-48 h-48 border-[1px] border-primary/20 relative animate-[spin_20s_linear_infinite] flex items-center justify-center">
    <div className="w-32 h-32 border-[1px] border-primary/40 rotate-45 flex items-center justify-center">
      <div className="w-16 h-16 border-[1px] border-primary/60 -rotate-45 bg-dark"></div>
    </div>
  </div>
);

const ScanningLaser = () => (
  <div className="w-48 h-48 border border-card/20 relative overflow-hidden bg-dark/50 grid grid-cols-4 grid-rows-4 gap-[1px]">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="bg-card/5 w-full h-full"></div>
    ))}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_10px_#E63B2E] animate-[scan_3s_ease-in-out_infinite_alternate]"></div>
    <style>{`@keyframes scan { from { transform: translateY(0); } to { transform: translateY(192px); } }`}</style>
  </div>
);

const PulsingWave = () => (
  <div className="w-64 h-32 flex items-center">
    <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
      <path 
        d="M 0 10 L 20 10 L 30 0 L 40 20 L 50 10 L 60 -10 L 70 30 L 80 10 L 100 10" 
        fill="none" 
        stroke="#E63B2E" 
        strokeWidth="1" 
        strokeLinecap="round"
        className="animate-[dash_2s_linear_infinite]"
        strokeDasharray="40 100"
      />
    </svg>
    <style>{`@keyframes dash { to { stroke-dashoffset: -140; } }`}</style>
  </div>
);

export default function Protocol() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // Skip last card for stacking logic
        
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false
          },
          scale: 0.9,
          opacity: 0.5,
          filter: "blur(20px)",
          ease: "none"
        });
      });
      
      // Pin the very last card so it stays in place if needed, or just let it scroll naturally.
      // Usually the last card doesn't need to be pinned if it's the end of the section group.
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Discovery & Measurement",
      desc: "Comprehensive on-site acoustical testing and data extraction.",
      bg: "bg-card text-primary",
      graphic: <RotatingMotif />
    },
    {
      num: "02",
      title: "Modeling & Analysis",
      desc: "Simulating reverberation dynamics to engineer precise interventions.",
      bg: "bg-dark text-on-dark border-t border-card/10",
      graphic: <ScanningLaser />
    },
    {
      num: "03",
      title: "Tactical Execution",
      desc: "Deploying high-performance materials seamlessly into your architecture.",
      bg: "bg-body text-primary border-t border-primary/10",
      graphic: <PulsingWave />
    }
  ];

  return (
    <section id="protocol" ref={containerRef} className="relative w-full">
      {steps.map((step, i) => (
        <div 
          key={i} 
          className={`protocol-card relative h-[100dvh] w-full flex flex-col md:flex-row items-center justify-between p-12 lg:p-24 origin-top shadow-2xl ${step.bg}`}
          style={{ zIndex: i + 1 }}
        >
          {/* Noise on cards for texture */}
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
          
          <div className="relative z-10 max-w-xl w-full flex flex-col gap-6">
            <span className="font-data text-accent text-6xl md:text-8xl tracking-tighter opacity-70">
              {step.num}.
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-6xl uppercase tracking-tighter loading-none">
              {step.title}
            </h2>
            <p className="font-data text-lg opacity-80 mt-4 leading-relaxed max-w-md">
              {step.desc}
            </p>
          </div>

          <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            {step.graphic}
          </div>
        </div>
      ))}
    </section>
  );
}
