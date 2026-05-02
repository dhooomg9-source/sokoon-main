import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import QuoteJourney from '../components/QuoteJourney';
import catalog from '../data/abstracta_catalog.json';

import acousticDoorImg from '../assets/generated/acoustic_door.png';
import soundInsulationImg from '../assets/generated/sound_insulation.png';
import productsHeroBg from '../assets/generated/products_hero_bg.png';

const IMAGE_MAP = {
  "/generated/acoustic_door.png": acousticDoorImg,
  "/generated/sound_insulation.png": soundInsulationImg
};

export default function ProductsPage() {
  const pageRef = useRef(null);
  
  // Extract clean text title from raw HTML link extracted from cheerio
  const getCleanTitle = (raw) => raw.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();

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
    <div ref={pageRef} className="w-full flex flex-col pt-32 pb-16 relative overflow-hidden bg-[#fafafa] text-black min-h-screen font-body z-0">
      {/* Hero Background Image */}
      <div className="absolute top-0 left-0 w-full h-[700px] -z-10 pointer-events-none overflow-hidden">
        <img 
          src={productsHeroBg} 
          alt="Products" 
          className="w-full h-full object-cover object-center animate-[imageReveal_2s_ease-out_forwards] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-0 scale-105" 
          style={{ animation: 'imageReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes imageReveal {
          to { opacity: 1; transform: scale(1); }
        }
      `}} />

      <section className="w-full flex flex-col items-center relative z-20 px-6 max-w-[1400px] mx-auto">
        
        <div className="mb-[350px] reveal-block flex flex-col items-center text-center pt-[5vh]">
          <p className="font-heading text-white max-w-5xl text-2xl md:text-4xl leading-snug md:leading-relaxed font-bold tracking-wide [text-shadow:_0_4px_30px_rgba(0,0,0,0.8),_0_2px_10px_rgba(0,0,0,0.6)]">
            Our products are developed in collaboration with influential contemporary designers, with the aim to create better soundscapes.
          </p>
        </div>

        <div className="w-full mb-12 reveal-block text-center flex flex-col items-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-accent tracking-tight mb-2">Product Categories</h2>
          <div className="w-12 h-1 bg-black/10 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-24 px-4">
          {catalog.categories.map((cat, i) => (
            <Link key={i} to={`/products/${cat.slug}`} className="reveal-block group flex flex-col h-full cursor-pointer pb-6 hover:-translate-y-1 transition-transform duration-500">
              <div className="mb-4 flex flex-col justify-end items-center h-12 md:h-16 px-2">
                <h3 className="font-heading text-black font-extrabold text-[15px] md:text-[17px] text-center transition-colors duration-300 group-hover:text-accent leading-tight line-clamp-2">
                  {getCleanTitle(cat.title)}
                </h3>
              </div>
              <div className="mt-auto w-full aspect-square bg-[#f2f2f2] relative overflow-hidden flex items-center justify-center group-hover:bg-[#ebebeb] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                <img 
                  src={IMAGE_MAP[(cat.img || "")] || (cat.img || "").replace(/&amp;/g, '&')} 
                  alt={cat.slug} 
                  className={`group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${(cat.img || "").includes('images.unsplash.com') ? 'w-full h-full object-cover' : 'w-[85%] h-[85%] object-contain mix-blend-multiply'}`}
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
