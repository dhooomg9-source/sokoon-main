import React from 'react';
import '../index.css';

export default function Partners() {
  const partners = [
    { name: "Public Investment Fund", url: "https://www.pif.gov.sa", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Public_Investment_Fund_logo.svg/512px-Public_Investment_Fund_logo.svg.png" },
    { name: "NEOM", url: "https://www.neom.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/NEOM_logo.svg/512px-NEOM_logo.svg.png" },
    { name: "Saudi Aramco", url: "https://www.aramco.com", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Saudi_Aramco_logo.svg/512px-Saudi_Aramco_logo.svg.png" },
    { name: "SABIC", url: "https://www.sabic.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/SABIC_Logo.svg/512px-SABIC_Logo.svg.png" },
    { name: "stc", url: "https://www.stc.com.sa", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/STC_Logo_English.svg/512px-STC_Logo_English.svg.png" },
    { name: "ROSHN", url: "https://www.roshn.sa", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Roshn_Logo.jpg/512px-Roshn_Logo.jpg" },
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
            <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none">
              <img src={partner.logo} alt={`${partner.name} Logo`} className="h-12 md:h-16 object-contain pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
