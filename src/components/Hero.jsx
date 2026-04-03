import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      gsap.fromTo(".hero-bg", 
        { scale: 1.05 },
        { scale: 1, duration: 2, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden bg-body text-primary flex flex-col justify-start pt-[200px] pb-20 px-6 md:px-12 lg:px-24 selection:bg-accent selection:text-on-dark">

      {/* Premium Acoustic Vibrant PET Felt Texture Background */}
      <div
        className="hero-bg absolute inset-0 w-full h-full z-0 opacity-100 pointer-events-none contrast-125 saturate-[1.2]"
        style={{
          backgroundImage: "url('/elegant_acoustic_fabric_hires.png')",
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
        }}
      ></div>

      {/* Decorative calm geometry (Stripe/Apple inspired) */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mb-8">


        <h1 className="hero-element flex flex-col gap-1 md:gap-2">
          <span className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none text-accent">
            Sound Control,
          </span>
          <span className="font-drama italic font-medium text-7xl md:text-8xl lg:text-9xl leading-none text-accent">
            Redefined.
          </span>
        </h1>

        <p className="hero-element mt-6 max-w-xl font-heading text-base md:text-lg text-black font-normal">
          Acoustic contracting and consulting solutions engineered for every space.
          Uncompromising sound control for an optimal sensory environment.
        </p>

        <div className="hero-element mt-8 flex items-center gap-6">
          <button
            className="btn-magnetic px-8 py-4 bg-accent text-on-dark rounded-full font-heading font-semibold text-lg relative"
            onClick={() => document.getElementById('quote-journey')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">Start Quote Journey</span>
          </button>
        </div>
      </div>
    </section>
  );
}
