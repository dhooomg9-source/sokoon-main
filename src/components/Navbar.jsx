import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
        <nav
          ref={navRef}
          className={`pointer-events-auto transition-all duration-500 flex items-center justify-between px-6 py-3 rounded-[3rem] w-full max-w-4xl backdrop-blur-3xl ${scrolled || !isHome
              ? 'bg-card/95 border border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-nav'
              : 'bg-card/40 border border-primary/10 text-nav shadow-md'
            }`}
        >
          <Link to="/" className="font-heading font-bold text-xl tracking-tighter hover-lift cursor-pointer">
            SOKOON
          </Link>

          <div className="hidden md:flex items-center gap-8 font-data text-sm uppercase tracking-wider">
            <div className="relative group hover-lift py-2">
              <Link to="/services" className="hover:text-accent transition-colors flex items-center gap-1">
                Services
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-2 w-64 opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 origin-top transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50">
                <div className="bg-card border border-primary/20 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col gap-3">
                  <Link to="/services/assessment-and-testing" className="hover:text-accent hover:pl-2 transition-all duration-300 text-nav text-xs font-bold leading-relaxed border-b border-primary/5 pb-2">Assessment & Testing</Link>
                  <Link to="/services/acoustic-paneling" className="hover:text-accent hover:pl-2 transition-all duration-300 text-nav text-xs font-bold leading-relaxed border-b border-primary/5 pb-2">Acoustic Paneling</Link>
                  <Link to="/services/sound-masking" className="hover:text-accent hover:pl-2 transition-all duration-300 text-nav text-xs font-bold leading-relaxed">Sound Masking</Link>
                </div>
              </div>
            </div>
            <Link to="/products" className="hover-lift hover:text-accent transition-colors py-2">Core Products</Link>
            <Link to="/why-choose" className="hover-lift hover:text-accent transition-colors py-2">Why Choose Sokoon</Link>
          </div>

          <button
            className={`btn-magnetic hidden md:block px-5 py-2 rounded-full font-heading font-semibold text-sm transition-colors overflow-hidden relative group ${scrolled || !isHome ? 'bg-accent text-on-dark' : 'bg-card text-primary'
              }`}
            onClick={() => {
              navigate('/quote-request');
            }}
          >
            <span className="relative z-10 duration-300">Quote Request</span>
            <span className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
          </button>

          <button
            className="md:hidden text-nav p-2 hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden fixed top-24 left-4 right-4 z-40 bg-card/95 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl transition-all duration-300 origin-top overflow-y-auto max-h-[70vh] ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-2">
          <Link to="/services" onClick={() => setIsOpen(false)} className="font-heading font-bold text-xl uppercase text-nav hover:text-accent transition-colors">Services</Link>
          <div className="flex flex-col gap-3 pl-4 border-l-2 border-primary/10 mt-2">
            <Link to="/services/assessment-and-testing" onClick={() => setIsOpen(false)} className="font-data text-sm uppercase text-slate-500 hover:text-accent transition-colors">Assessment & Testing</Link>
            <Link to="/services/acoustic-paneling" onClick={() => setIsOpen(false)} className="font-data text-sm uppercase text-slate-500 hover:text-accent transition-colors">Acoustic Paneling</Link>
            <Link to="/services/sound-masking" onClick={() => setIsOpen(false)} className="font-data text-sm uppercase text-slate-500 hover:text-accent transition-colors">Sound Masking</Link>
          </div>
        </div>
        <Link to="/products" onClick={() => setIsOpen(false)} className="font-heading font-bold text-xl uppercase text-nav hover:text-accent transition-colors">Core Products</Link>
        <Link to="/why-choose" onClick={() => setIsOpen(false)} className="font-heading font-bold text-xl uppercase text-nav hover:text-accent transition-colors">Why Choose Sokoon</Link>
        <button
          className="btn-magnetic w-full py-4 rounded-xl font-heading font-semibold text-lg bg-accent text-on-dark mt-4 relative overflow-hidden group"
          onClick={() => {
            setIsOpen(false);
            navigate('/quote-request');
          }}
        >
          <span className="relative z-10">Quote Request</span>
          <span className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
        </button>
      </div>
    </>
  );
}
