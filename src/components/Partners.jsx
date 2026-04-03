import React from 'react';
import '../index.css';

export default function Partners() {
  const partners = [
    { name: "Public Investment Fund", url: "https://www.pif.gov.sa", logo: "https://logo.clearbit.com/pif.gov.sa" },
    { name: "NEOM", url: "https://www.neom.com", logo: "https://logo.clearbit.com/neom.com" },
    { name: "Saudi Aramco", url: "https://www.aramco.com", logo: "https://logo.clearbit.com/aramco.com" },
    { name: "SABIC", url: "https://www.sabic.com", logo: "https://logo.clearbit.com/sabic.com" },
    { name: "stc", url: "https://www.stc.com.sa", logo: "https://logo.clearbit.com/stc.com.sa" },
    { name: "ROSHN", url: "https://www.roshn.sa", logo: "https://logo.clearbit.com/roshn.sa" },
  ];

  // Double the array for seamless marquee loops
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-body overflow-hidden border-t-2 border-b-2 border-primary/5 my-12 relative">
      {/* Gradients to fade the edges smoothly */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-body to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-body to-transparent z-10 pointer-events-none"></div>

      <div className="px-6 md:px-12 lg:px-24 mb-16 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-accent uppercase tracking-tighter">
          Our PARTNERS
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="relative w-full flex overflow-hidden mask-edges z-0">
        <div className="animate-marquee-scroll flex w-max items-center gap-16 md:gap-24 py-4 hover:[animation-play-state:paused]">
          {duplicatedPartners.map((partner, index) => (
            <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none">
              <img src={partner.logo} alt={`${partner.name} Logo`} className="h-12 md:h-16 object-contain pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
