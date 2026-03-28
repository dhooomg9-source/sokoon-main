import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import WhyChoosePage from './pages/WhyChoosePage';
import AssessmentAndTestingPage from './pages/services/AssessmentAndTestingPage';
import AcousticPanelingPage from './pages/services/AcousticPanelingPage';
import SoundMaskingPage from './pages/services/SoundMaskingPage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
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
      <div className="flex items-center justify-center h-screen w-screen bg-body text-primary">
        <h1 className="font-heading font-bold text-4xl uppercase tracking-widest animate-pulse">
          Initializing System
        </h1>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <main className="w-full relative overflow-x-hidden selection:bg-accent selection:text-on-dark bg-body min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/assessment-and-testing" element={<AssessmentAndTestingPage />} />
          <Route path="/services/acoustic-paneling" element={<AcousticPanelingPage />} />
          <Route path="/services/sound-masking" element={<SoundMaskingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:categorySlug" element={<CategoryPage />} />
          <Route path="/products/:categorySlug/:productSlug" element={<ProductDetailsPage />} />
          <Route path="/why-choose" element={<WhyChoosePage />} />
          <Route path="/quote-request" element={<QuoteRequestPage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
