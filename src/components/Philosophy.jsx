import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);
  
  // Parallax Image removed per request

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Parallax Image
      gsap.to(".philosophy-bg", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: "20%",
        ease: "none"
      });

      // Split text reveal approach (line-by-line fade up)
      gsap.from(".phil-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        },
        y: 40,
        autoAlpha: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 overflow-hidden bg-dark flex items-center justify-center border-t border-card/10">
      <div className="philosophy-bg absolute inset-[-20%] z-0 bg-dark/40 opacity-10"></div>
      
      <div className="relative z-10 px-6 max-w-5xl mx-auto w-full flex flex-col items-start gap-12">
        <p className="phil-line font-heading text-xl md:text-3xl text-slate-300 uppercase tracking-widest max-w-2xl">
          Most acoustic consulting focuses on: <span className="text-on-dark">surface-level mitigation.</span>
        </p>
        
        <h2 className="phil-line font-heading font-bold text-4xl md:text-6xl lg:text-8xl text-on-dark uppercase tracking-tighter leading-[0.9]">
          We focus on: <br/>
          <span className="font-drama italic text-5xl md:text-7xl lg:text-9xl text-accent font-normal mt-2 block">
            Architectural Blueprinting.
          </span>
        </h2>
      </div>
    </section>
  );
}
