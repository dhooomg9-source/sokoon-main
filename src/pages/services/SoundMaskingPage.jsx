import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Volume2, ArrowRight, Target, ShieldCheck, Zap } from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const maskingFeatures = [
  {
    icon: Target,
    title: "Targeted Frequency Cover",
    desc: "Our systems emit a precisely tuned ambient sound (similar to gentle airflow) that matches the frequencies of human speech, effectively masking it from listeners."
  },
  {
    icon: ShieldCheck,
    title: "Speech Privacy Guarantee",
    desc: "Essential for financial and medical institutions. Sound masking dramatically reduces the radius of intelligibility, ensuring confidential conversations remain private."
  },
  {
    icon: Zap,
    title: "Adaptive Zoning",
    desc: "Our advanced network controllers allow us to zone masking volumes dynamically. Different areas of an open-plan office can have different masking levels managed centrally."
  }
];

export default function SoundMaskingPage() {
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
            <Volume2 className="w-8 h-8 text-accent" />
          </div>
          <p className="reveal-item font-data text-accent font-bold uppercase tracking-widest mb-4">Sound Masking Systems</p>
          <h1 className="reveal-item font-heading font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-black leading-none mb-6">
            Engineered<br/><span className="text-slate-400">Privacy.</span>
          </h1>
          <p className="reveal-item font-body text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
            Sometimes the solution isn't absorbing sound, but masking it. Our sophisticated electronic sound masking systems introduce a subtle, constant background noise to reduce distractions and secure speech privacy.
          </p>
          <button 
            onClick={() => navigate('/quote-request')}
            className="reveal-item btn-magnetic flex items-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-heading font-bold text-lg group"
          >
            <span>Request a Consultation</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* Visual representation */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative side-image">
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
              alt="Sound Masking Office"
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="font-heading font-bold text-white text-xl">Distraction Radius</span>
              <div className="flex items-center gap-2">
                 <span className="line-through text-white/50 text-lg font-data">40ft</span>
                 <ArrowRight className="text-accent w-4 h-4" />
                 <span className="font-data font-black text-white text-2xl text-accent">12ft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Capabilities */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mt-32">
        <h2 className="reveal-item font-heading font-black text-4xl text-black mb-8 max-w-2xl">
          Sound Masking Systems
        </h2>
        
        <div className="reveal-item max-w-4xl font-data text-slate-700 text-lg leading-relaxed flex flex-col gap-6 mb-16">
          <p>
            Sound masking systems help control noise levels in offices, restaurants, classrooms and healthcare facilities by introducing a background sound that reduces the impact of environmental noise. 
          </p>
          <p>
            Specially engineered to match the frequency of human speech, sound masking will reduce the distance at which human speech can be heard and understood, making conversations less intrusive and creating a more balanced, acoustically comfortable space.
          </p>
        </div>

        <h2 className="reveal-item font-heading font-black text-4xl text-black mb-8 max-w-2xl">
          How sound masking works?
        </h2>
        
        <div className="reveal-item max-w-4xl font-data text-slate-700 text-lg leading-relaxed flex flex-col gap-6 mb-24">
          <p>
            Sound masking introduces a subtle, ambient background sound, similar to gentle airflow, that blends seamlessly into the environment. By doing so, it minimises the intelligibility of speech, making conversations less intrusive and creating a more balanced, acoustically comfortable space.
          </p>
        </div>
      </section>

      {/* 3-Column Hover Grid (References Resonics layout) */}
      <section className="w-full flex flex-col md:flex-row h-auto min-h-[600px] pb-0">
        {[
          {
            title: "Automatic\ncalibration",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", 
            desc: "Patented equalisation technology analyses room acoustics to create a seamless sound masking signal."
          },
          {
            title: "Real-time\nvolume\nadjustments",
            img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200",
            desc: "Volume adapts to office noise levels, increasing in busy moments and lowering when the space quiets down."
          },
          {
            title: "Network\nready",
            img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1200",
            desc: "Whether wired or wireless, our smart controllers manage multiple office zones simultaneously."
          }
        ].map((item, idx) => (
          <div key={idx} className="reveal-item group relative flex-1 min-h-[400px] md:min-h-[600px] border-r border-white/20 last:border-0 overflow-hidden cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-500 group-hover:from-black/80 group-hover:via-black/20 group-hover:to-black/95" />
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
              <h3 className="font-heading font-medium text-3xl md:text-4xl text-white leading-tight whitespace-pre-line z-10">
                {item.title}
              </h3>
              
              <div className="relative overflow-visible w-full h-48 z-10 flex items-end">
                <p className="font-data text-white/90 text-lg md:text-xl leading-relaxed translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out mb-2">
                  {item.desc}
                </p>
                <div className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-white text-3xl font-light mb-1">+</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
