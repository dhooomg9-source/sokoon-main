import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import WhyChoosePage from './pages/WhyChoosePage';
import Footer from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  // Simple hardcut loader
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background text-dark">
        <h1 className="font-heading font-bold text-4xl uppercase tracking-widest animate-pulse">
          Initializing System
        </h1>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <main className="w-full relative overflow-x-hidden selection:bg-accent selection:text-paper bg-background min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/why-choose" element={<WhyChoosePage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
