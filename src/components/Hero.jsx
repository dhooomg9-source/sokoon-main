import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Staggered reveal of text lines and CTA
      gsap.from(".hero-element", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      });

      // Subtle image zoom on load
      gsap.from(".hero-bg", {
        scale: 1.05,
        duration: 2,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden bg-background text-dark flex flex-col justify-start pt-[200px] pb-20 px-6 md:px-12 lg:px-24 selection:bg-accent selection:text-paper">

      {/* Premium Acoustic Vibrant PET Felt Texture Background */}
      <div
        className="hero-bg absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: "url('/vibrant-pet-felt.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>

      {/* Smooth fade into the rest of the site */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none"></div>

      {/* Decorative calm geometry (Stripe/Apple inspired) */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mb-8">
        <p className="hero-element font-data text-accent uppercase tracking-widest text-xs md:text-sm mb-4 flex items-center gap-3">
          <span className="w-8 h-[1px] bg-accent inline-block"></span> Precision Acoustic Engineering
        </p>

        <h1 className="hero-element flex flex-col gap-1 md:gap-2">
          <span className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none text-dark">
            Sound Control,
          </span>
          <span className="font-drama italic font-medium text-7xl md:text-8xl lg:text-9xl leading-none text-accent">
            Redefined.
          </span>
        </h1>

        <p className="hero-element mt-6 max-w-xl font-heading text-base md:text-lg text-muted font-normal">
          Acoustic contracting and consulting solutions engineered for every space.
          Uncompromising sound control for an optimal sensory environment.
        </p>

        <div className="hero-element mt-8 flex items-center gap-6">
          <button
            className="btn-magnetic px-8 py-4 bg-accent text-paper rounded-full font-heading font-semibold text-lg relative group overflow-hidden"
            onClick={() => document.getElementById('quote-journey')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">Start Quote Journey</span>
            <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
