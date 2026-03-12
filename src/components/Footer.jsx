import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-midnight-flow text-paper rounded-t-[4rem] px-8 py-16 md:py-24 relative z-20 flex flex-col mt-32 border-t border-borderLight/20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2 flex flex-col gap-6">
          <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tighter uppercase">SOKOON</h2>
          <p className="font-data text-paper/50 max-w-sm text-sm">
            Precision Acoustic Engineering & Soundproofing.
            Designing functional artifacts and mathematical isolation for brutal environments.
          </p>
          <div className="mt-8 flex items-center gap-3 font-data text-xs text-emerald-400 uppercase tracking-widest bg-paper/5 w-max px-4 py-2 rounded-full border border-paper/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></span>
            System Operational
          </div>
        </div>

        <div className="flex flex-col gap-4 font-data text-sm">
          <h4 className="font-heading font-bold uppercase text-paper/50 mb-2">Navigation</h4>
          <Link to="/services" className="hover:text-accent transition-colors">Acoustic Services</Link>
          <Link to="/products" className="hover:text-accent transition-colors">Core Products</Link>
          <Link to="/why-choose" className="hover:text-accent transition-colors">Why Choose Sokoon</Link>
          <Link to="/" className="hover:text-accent transition-colors">Quote Journey</Link>
        </div>

        <div className="flex flex-col gap-4 font-data text-sm">
          <h4 className="font-heading font-bold uppercase text-paper/50 mb-2">Legal</h4>
          <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-accent transition-colors">Cookie Data</Link>
        </div>

        <div className="flex flex-col gap-4 font-data text-sm">
          <h4 className="font-heading font-bold uppercase text-paper/50 mb-2">Contact Us</h4>
          <a href="mailto:Dhooom.g9@gmail.com" className="hover:text-accent transition-colors break-all">Dhooom.g9@gmail.com</a>
          <a href="tel:+966501234567" className="hover:text-accent transition-colors">+966 50 123 4567</a>
          <span className="text-paper/70">Riyadh, Saudi Arabia</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full mt-24 pt-8 border-t border-paper/10 text-center font-data text-xs text-paper/30 uppercase">
        © {new Date().getFullYear()} SOKOON Acoustics. All parameters locked.
      </div>
    </footer>
  );
}
