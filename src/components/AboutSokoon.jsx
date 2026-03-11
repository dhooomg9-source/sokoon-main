import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSokoon() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-paper max-w-7xl mx-auto rounded-[3rem] shadow-xl my-12 border border-dark/5">
      <div className="flex flex-col items-center text-center mb-16 about-reveal">
        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-dark uppercase tracking-tighter mb-6">
          About SOKOON
        </h2>
        <p className="font-body text-lg md:text-xl text-dark/70 max-w-3xl leading-relaxed">
          As a newly established force in the industry, Sokoon realizes the modern and evolving needs of the acoustic market. We don't just supply materials; we engineer comprehensive auditory experiences tailored for contemporary infrastructure, bridging the gap between raw physical functioning and elevated aesthetic design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="about-reveal p-10 rounded-[2rem] bg-background border border-borderLight hover:border-accent transition-colors duration-500 group">
          <h3 className="font-heading font-bold text-2xl mb-4 text-dark flex items-center gap-3">
            <span className="w-8 h-[2px] bg-accent inline-block"></span> Vision Statement
          </h3>
          <p className="font-data text-sm md:text-base text-dark/70 leading-relaxed">
            To become the defining standard for acoustic excellence globally, transforming how humanity experiences sound within structured environments through relentless innovation and precise engineering.
          </p>
        </div>
        <div className="about-reveal p-10 rounded-[2rem] bg-dark text-paper shadow-2xl hover:border-accent border border-transparent transition-colors duration-500 group">
          <h3 className="font-heading font-bold text-2xl mb-4 flex items-center gap-3 text-paper">
            <span className="w-8 h-[2px] bg-accent inline-block"></span> Mission Statement
          </h3>
          <p className="font-data text-sm md:text-base text-paper/70 leading-relaxed">
            To deliver highly specialized, intelligent sound control protocols that empower architects, builders, and occupants to reclaim their sensory environments without compromising structural integrity.
          </p>
        </div>
      </div>
    </section>
  );
}
