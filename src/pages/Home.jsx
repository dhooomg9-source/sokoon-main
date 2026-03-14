import React from 'react';
import Hero from '../components/Hero';
import AboutSokoon from '../components/AboutSokoon';
import Features from '../components/Features';
import Partners from '../components/Partners';
import QuoteJourney from '../components/QuoteJourney';

export default function Home() {
  return (
    <div className="w-full flex flex-col relative overflow-hidden bg-background">
      {/* Abstract gradient mesh for Home */}
      <div className="absolute top-0 right-0 w-full h-[150vh] bg-gradient-to-br from-accent/5 to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10 w-full flex flex-col">
        <Hero />
        <AboutSokoon />
        <Partners />
        <QuoteJourney />
      </div>
    </div>
  );
}
