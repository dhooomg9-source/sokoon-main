import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FileText, ArrowRight, CheckCircle2, Ruler, BarChart3, Presentation } from 'lucide-react';

const assessmentFeatures = [
  {
    icon: Ruler,
    title: "RT60 Reverberation Analysis",
    desc: "We measure the exact time it takes for sound to decay by 60 decibels. High reverberation is the primary cause of echo and poor speech intelligibility in open spaces."
  },
  {
    icon: BarChart3,
    title: "Frequency Spectrum Mapping",
    desc: "Using class-A calibrated microphones, our acousticians map the specific frequency profiles of your room, identifying problematic resonances and standing waves."
  },
  {
    icon: Presentation,
    title: "Acoustic Modeling & Reports",
    desc: "Post-survey, we provide a detailed, data-driven report and 3D acoustic rendering, showing exactly how many panels are required and where they should be placed to hit target parameters."
  }
];

export default function AssessmentAndTestingPage() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
      });
      
      gsap.from(".side-image", {
        x: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-body pt-[160px] pb-24 text-primary overflow-hidden">
      
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-20 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        <div className="w-full lg:w-1/2">
          <div className="reveal-item w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
            <FileText className="w-8 h-8 text-accent" />
          </div>
          <p className="reveal-item font-data text-accent font-bold uppercase tracking-widest mb-4">Acoustic Survey & Testing</p>
          <h1 className="reveal-item font-heading font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-black leading-none mb-6">
            Precision<br/><span className="text-slate-400">Diagnostics.</span>
          </h1>
          <p className="reveal-item font-body text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
            You cannot solve an acoustic problem you haven't accurately diagnosed. Our exhaustive on-site acoustic surveys form the baseline for every successful sound control strategy we deploy.
          </p>
          <button 
            onClick={() => navigate('/quote-request')}
            className="reveal-item btn-magnetic flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-heading font-bold text-lg group"
          >
            <span>Request an Acoustic Survey</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Visual representation of testing */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative side-image">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=1200" 
              alt="Acoustic surveying"
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          {/* Data overlay card */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
            <div className="flex justify-between items-end mb-4">
              <span className="font-data text-white/70 text-sm">RT60 Target: 0.8s</span>
              <span className="font-heading font-black text-white text-3xl">1.4s <span className="text-sm font-normal text-white/70">Measured</span></span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-32">
        <h2 className="reveal-item font-heading font-black text-4xl text-black mb-16 max-w-2xl">
          What happens during an Acoustic Survey?
        </h2>
        
        <div className="reveal-item max-w-4xl font-data text-slate-700 text-lg leading-relaxed flex flex-col gap-6">
          <p>
            An acoustic survey provides a detailed understanding of your noise challenges, along with expert recommendations on the most effective products, placement, and quantity of panels required.
          </p>
          <p>
            Ceiling height, surface finishes, furnishings, and room use all influence how much sound absorption is needed. Too little absorption delivers minimal improvement, while too much can leave a space sounding flat or unnaturally quiet.
          </p>
          <p>
            Our surveys also address speech privacy concerns — often mistaken for ‘soundproofing’ — by identifying the right combination of acoustic treatments and, where appropriate, sound masking solutions. This ensures environments that are comfortable, confidential, and acoustically optimised.
          </p>
        </div>
      </section>

      {/* Why survey? */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-32 bg-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-4xl">
          <h2 className="reveal-item font-heading font-black text-4xl md:text-5xl mb-8">Why guessing doesn't work.</h2>
          <p className="reveal-item font-body text-xl text-white/80 leading-relaxed mb-8">
            Many businesses attempt to fix acoustic issues by arbitrarily placing panels on walls. Without measuring the room's unique reverberation signature, this often results in over-specifying materials (wasting money) or under-specifying (failing to solve the problem).
          </p>
          <ul className="reveal-item space-y-4 font-data text-white/90">
            <li className="flex items-center gap-3"><CheckCircle2 className="text-accent" /> Guaranteed performance targets via calculation</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-accent" /> Cost-optimized material specification</li>
            <li className="flex items-center gap-3"><CheckCircle2 className="text-accent" /> Exact placement geometry for maximum absorption</li>
          </ul>
        </div>
      </section>

    </div>
  );
}
