import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import QuoteJourney from '../components/QuoteJourney';
import catalog from '../data/abstracta_catalog.json';

export default function ProductsPage() {
  const pageRef = useRef(null);
  
  // Extract clean text title from raw HTML link extracted from cheerio
  const getCleanTitle = (raw) => raw.replace(/<[^>]*>?/gm, '').trim();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-block", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full flex flex-col pt-32 pb-16 relative overflow-hidden bg-[#fafafa] text-black min-h-screen font-body">
      <section className="w-full flex flex-col items-center relative z-20 px-6 max-w-[1400px] mx-auto">
        
        <div className="mb-20 reveal-block flex flex-col items-center text-center">
          <h1 className="font-heading font-black text-[3.5rem] md:text-7xl mb-6 text-accent tracking-tight tracking-tighter">Products</h1>
          <p className="font-data text-slate-800 max-w-4xl text-[1.15rem] md:text-xl leading-relaxed font-semibold">
            Our products are developed in collaboration with influential contemporary designers, with the aim to create better soundscapes.
          </p>
        </div>

        <div className="w-full mb-12 reveal-block text-center flex flex-col items-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-accent tracking-tight mb-2">Product Categories</h2>
          <div className="w-12 h-1 bg-black/10 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-24 px-4">
          {catalog.categories.map((cat, i) => (
            <Link key={i} to={`/products/${cat.slug}`} className="reveal-block group flex flex-col cursor-pointer pb-6 hover:-translate-y-1 transition-transform duration-500">
              <h3 className="mb-4 font-heading text-black font-extrabold text-[15px] md:text-[17px] text-center transition-colors duration-300 group-hover:text-accent">
                {getCleanTitle(cat.title)}
              </h3>
              <div className="w-full aspect-square bg-[#f2f2f2] relative overflow-hidden flex items-center justify-center group-hover:bg-[#ebebeb] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                <img 
                  src={(cat.img || "").replace(/&amp;/g, '&')} 
                  alt={cat.slug} 
                  className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mix-blend-multiply"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <div className="reveal-block px-4 max-w-[1400px] mx-auto w-full">
        <QuoteJourney />
      </div>
    </div>
  );
}
