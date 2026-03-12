import React from 'react';
import '../index.css';

export default function Partners() {
  const partners = [
    { name: "Public Investment Fund", url: "https://www.pif.gov.sa" },
    { name: "NEOM", url: "https://www.neom.com" },
    { name: "Saudi Aramco", url: "https://www.aramco.com" },
    { name: "SABIC", url: "https://www.sabic.com" },
    { name: "stc", url: "https://www.stc.com.sa" },
    { name: "ROSHN", url: "https://www.roshn.sa" },
    { name: "Red Sea Global", url: "https://www.redseaglobal.com" },
    { name: "Diriyah Gate", url: "https://dgda.gov.sa" }
  ];

  // Double the array for seamless marquee loops
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-background overflow-hidden border-t-2 border-b-2 border-dark/5 my-12 relative">
      {/* Gradients to fade the edges smoothly */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

      <div className="px-6 md:px-12 lg:px-24 mb-16 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-5xl text-dark uppercase tracking-tighter">
          Our PARTNERS
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="relative w-full flex overflow-hidden mask-edges z-0">
        <div className="animate-marquee-scroll flex w-max items-center gap-16 md:gap-24 py-4 hover:pause-marquee">
          {duplicatedPartners.map((partner, index) => (
            <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="text-3xl md:text-5xl font-drama italic text-dark/30 hover:text-accent transition-colors duration-300 uppercase shrink-0">
              {partner.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
