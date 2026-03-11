import React from 'react';
import '../index.css';

export default function Partners() {
  const partners = [
    "Foster & Partners", "Gensler", "Skidmore, Owings & Merrill", "ARUP",
    "Zaha Hadid Architects", "Buro Happold", "WSP", "AECOM",
    "HOK", "Perkins&Will", "Stantec", "Jacobs"
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
        <div className="animate-marquee-scroll flex w-max items-center gap-16 md:gap-24 py-4">
          {duplicatedPartners.map((partner, index) => (
            <span key={index} className="text-3xl md:text-5xl font-drama italic text-dark/20 hover:text-accent transition-colors duration-300 cursor-default uppercase shrink-0">
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
