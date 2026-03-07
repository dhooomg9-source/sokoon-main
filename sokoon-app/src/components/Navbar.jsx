import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
    <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        ref={navRef}
        className={`pointer-events-auto transition-all duration-500 flex items-center justify-between px-6 py-3 rounded-[3rem] w-full max-w-4xl backdrop-blur-3xl ${
          scrolled || !isHome
            ? 'bg-paper/95 border border-dark/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-dark' 
            : 'bg-paper/40 border border-dark/10 text-dark shadow-md'
        }`}
      >
        <Link to="/" className="font-heading font-bold text-xl tracking-tighter hover-lift cursor-pointer">
          SOKOON
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-data text-sm uppercase tracking-wider">
          <Link to="/services" className="hover-lift">Acoustic Services</Link>
          <Link to="/products" className="hover-lift">Core Products</Link>
          <Link to="/why-choose" className="hover-lift">Why Choose Sokoon</Link>
        </div>

        <button 
          className={`btn-magnetic px-5 py-2 rounded-full font-heading font-semibold text-sm transition-colors overflow-hidden relative group ${
            scrolled || !isHome ? 'bg-accent text-paper' : 'bg-paper text-dark'
          }`}
          onClick={() => {
            if (!isHome) {
              navigate('/');
              setTimeout(() => {
                document.getElementById('quote-journey')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              document.getElementById('quote-journey')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <span className="relative z-10 group-hover:text-paper transition-colors duration-300">Quote Journey</span>
          <span className="absolute inset-0 bg-dark translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
        </button>
      </nav>
    </div>
  );
}
