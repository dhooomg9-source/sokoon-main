import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import QuoteJourney from '../components/QuoteJourney';
import AboutSokoon from '../components/AboutSokoon';
import whyChooseHeroBg from '../assets/generated/why_choose_hero_bg.png';

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
    <div ref={pageRef} className="w-full flex flex-col pt-24 relative overflow-hidden bg-body z-0">
      {/* Hero Background Image */}
      <div className="absolute top-0 left-0 w-full h-[650px] -z-10 pointer-events-none">
        <img src={whyChooseHeroBg} alt="Why Choose Sokoon" className="w-full h-full object-cover opacity-100 object-center" />
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-body via-body/20 to-transparent"></div>
      </div>

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-transparent w-full flex flex-col items-center relative z-20">
        <div className="w-full max-w-6xl">
          <div className="mb-20 reveal-block flex flex-col items-center text-center">
            <h1 className="font-heading font-black text-[3.5rem] md:text-7xl mb-6 text-accent tracking-tighter uppercase">
              Why Choose Sokoon
            </h1>
            <p className="font-data text-slate-800 max-w-4xl text-[1.15rem] md:text-xl leading-relaxed font-semibold">
              At SOKOON, we believe every space should be as comfortable acoustically as it is visually. Modern commercial design has embraced sleek, minimalist aesthetics—glass walls, exposed concrete, stone, and steel. While striking to the eye, these materials often create noisy, reverberant environments.
            </p>
          </div>

          <div className="-mx-6 md:-mx-12 lg:-mx-24 mb-16 relative z-30">
            <AboutSokoon />
          </div>

          <div className="w-full flex flex-col items-center mt-8 mb-16">
            <h3 className="font-heading font-bold text-4xl md:text-5xl text-accent mb-16 text-center w-full uppercase tracking-widest reveal-block">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 w-full max-w-5xl">
              {[
                { title: 'Integrity', desc: 'Honest, ethical, and accountable in every technical recommendation and acoustic measurement.' },
                { title: 'Innovation', desc: 'Utilizing next-generation acoustic mapping algorithms and bleeding-edge material science.' },
                { title: 'Collaboration', desc: 'Integrating seamlessly with your architects, GC teams, and internal stakeholders.' },
                { title: 'Excellence', desc: 'ISO-certified standards ensuring total operational perfection from blueprint to deployment.' }
              ].map((val, i) => (
                <div key={i} className="reveal-block border-t-2 border-primary/10 pt-8 flex flex-col">
                  <div className="font-data text-accent font-bold mb-4 tracking-tighter text-4xl leading-none">0{i + 1}</div>
                  <h4 className="font-heading font-bold text-3xl text-accent mb-4">{val.title}</h4>
                  <p className="font-data text-primary text-base leading-relaxed max-w-sm font-medium">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <QuoteJourney />
    </div>
  );
}
