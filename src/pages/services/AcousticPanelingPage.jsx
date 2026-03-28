import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Blocks, ArrowRight, Palette, Layers, Minimize } from 'lucide-react';

const panelFeatures = [
  {
    icon: Palette,
    title: "Design-Led Acoustics",
    desc: "We don't compromise aesthetic integrity. Our panels come in hundreds of luxury fabric finishes, custom geometries, and seamless integrations that elevate the visual environment."
  },
  {
    icon: Layers,
    title: "Class-A Absorption",
    desc: "Engineered from high-density glass wool, PET felt, and perforated woods, our panels offer broadband absorption targeting critical speech frequencies."
  },
  {
    icon: Minimize,
    title: "Unobtrusive Installation",
    desc: "Our proprietary mounting systems ensure panels float perfectly flush against walls or suspend elegantly from ceilings with minimal structural impact."
  }
];

export default function AcousticPanelingPage() {
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
        x: -60,
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
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-20 flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Visual representation */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative side-image">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" 
              alt="Acoustic Panels"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center justify-between">
             <div className="text-white">
                <p className="font-heading font-bold text-xl">NRC Reduction</p>
                <p className="font-data text-white/70 text-sm">Targeted Speech Frequencies</p>
             </div>
             <div className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center font-heading font-black text-xl text-white">
               85%
             </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="reveal-item w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
            <Blocks className="w-8 h-8 text-accent" />
          </div>
          <p className="reveal-item font-data text-accent font-bold uppercase tracking-widest mb-4">Acoustic Paneling</p>
          <h1 className="reveal-item font-heading font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-black leading-none mb-6">
            Architectural<br/><span className="text-slate-400">Harmony.</span>
          </h1>
          <p className="reveal-item font-body text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
            Combat excessive reverberation and echo with our curated selection of high-performance acoustic panels. Designed to integrate seamlessly into any commercial, hospitality, or residential space.
          </p>
          <button 
            onClick={() => navigate('/products')}
            className="reveal-item btn-magnetic flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-heading font-bold text-lg group"
          >
            <span>Explore Core Products</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* The Core Capabilities */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-32">
        <h2 className="reveal-item font-heading font-black text-4xl text-black mb-8 max-w-2xl">
          What are acoustic panels?
        </h2>
        
        <div className="reveal-item max-w-4xl font-data text-slate-700 text-lg leading-relaxed flex flex-col gap-6 mb-16">
          <p>
            Acoustic panels is a broad term for products that reduce echo and reverberation, helping to reduce background noise, improve clarity and create a better acoustic environment.
          </p>
          <p>
            With so many acoustic panels on the market, offering different materials, styles and absorption ratings, it can be overwhelming to know where to begin.
          </p>
          <p>
            SOKOON specialise in selecting the best panels for your project, tailoring our recommendations based on each space, acoustic goals and budget.
          </p>
        </div>

        <h2 className="reveal-item font-heading font-black text-4xl text-black mb-8 max-w-2xl">
          Expert guidance for acoustic panel selection
        </h2>

        <div className="reveal-item max-w-4xl font-data text-slate-700 text-lg leading-relaxed flex flex-col gap-6 mb-12">
          <p>
            Not every space needs the same level of absorption. A lively school hall will need a very different approach than a small meeting room or open-plan office.
          </p>
          <p>
            Involving an expert can ensure you get the best results. SOKOON offer free, no-obligation acoustic surveys, either in person or remotely. We’ll assess your space, calculate what’s needed, and provide a clear, tailored plan that includes recommendations for the best-suited acoustic treatments.
          </p>
        </div>

        <button 
          onClick={() => navigate('/products')}
          className="reveal-item btn-magnetic bg-accent text-white px-10 py-4 rounded-full font-heading font-bold text-lg hover:bg-black transition-colors"
        >
          Explore Panel Products
        </button>
      </section>

      {/* Premium Integration */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-32 bg-dark rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-[150%] bg-gradient-to-bl from-accent/20 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <h2 className="reveal-item font-heading font-black text-4xl md:text-5xl mb-8">Not just a product, a tailored installation.</h2>
          <p className="reveal-item font-body text-xl text-white/80 leading-relaxed mb-12">
            Every room poses unique geometrical challenges. We don't just supply acoustic panels; we engineer their layout. From suspended acoustic baffles and vertical rafts to fabric-wrapped wall modules, our installation teams guarantee structural precision and acoustic perfection.
          </p>
          <button 
            onClick={() => navigate('/quote-request')}
            className="reveal-item btn-magnetic bg-white text-dark px-10 py-4 rounded-full font-heading font-bold text-lg hover:bg-accent hover:text-white transition-colors"
          >
            Start your project
          </button>
        </div>
      </section>

    </div>
  );
}
