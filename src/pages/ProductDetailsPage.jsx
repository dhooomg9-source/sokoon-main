import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronLeft, Download } from 'lucide-react';
import catalog from '../data/abstracta_catalog.json';
import QuoteJourney from '../components/QuoteJourney';

// Dynamic asset map for products
const productAssets = import.meta.glob('../assets/products/*', { eager: true, import: 'default' });
const categoryAssets = import.meta.glob('../assets/generated/*', { eager: true, import: 'default' });

const resolveAsset = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const fileName = path.split('/').pop();
  
  if (path.includes('/products/')) {
    const matched = Object.keys(productAssets).find(key => key.endsWith(fileName));
    return matched ? productAssets[matched] : path;
  }
  
  if (path.includes('/generated/')) {
    const matched = Object.keys(categoryAssets).find(key => key.endsWith(fileName));
    return matched ? categoryAssets[matched] : path;
  }

  return path;
};

export default function ProductDetailsPage() {
  const { categorySlug, productSlug } = useParams();
  const pageRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);

  const product = catalog.products.find(p => p.slug === productSlug && p.categorySlug === categorySlug);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, [productSlug]);

  // Determine available tabs
  const allTabs = [
    { id: 'inspiration', label: 'Inspiration' },
    { id: 'technical-specification', label: 'Technical specification' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'materials-and-colours', label: 'Materials and colours' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'projects', label: 'Projects' }
  ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const availableTabs = React.useMemo(() => product ? allTabs.filter(tab => product.sections && product.sections[tab.id]) : [], [product]);

  useEffect(() => {
    if (availableTabs.length > 0 && !activeTab) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab(availableTabs[0].id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug, availableTabs, activeTab]);

  // Use gallery if available, otherwise just use the main img
  const images = product && product.gallery && product.gallery.length > 0 ? product.gallery : product ? [product.img] : [];

  if (!product) {
    return <div className="pt-40 text-center font-heading text-2xl">Product not found</div>;
  }

  return (
    <div ref={pageRef} className="w-full flex flex-col pt-32 pb-16 relative overflow-hidden bg-[#fafafa] text-black min-h-screen font-body">
      <section className="w-full flex flex-col relative z-20 px-6 max-w-[1400px] mx-auto">
        
        {/* Breadcrumb back */}
        <div className="reveal-item w-full mb-8 flex items-center">
          <Link to={`/products/${categorySlug}`} className="flex items-center text-slate-500 hover:text-black font-heading text-sm font-semibold transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            Back to Category
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 mb-24">
          
          {/* Left: Images */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">
            <div className="reveal-item w-full bg-[#f2f2f2] flex items-center justify-center p-8 lg:p-16 relative overflow-hidden rounded-md shadow-sm">
              <img src={resolveAsset(images[0])} alt={product.title} className="w-full max-w-[600px] object-contain drop-shadow-lg mix-blend-multiply" />
            </div>
            
            {/* Gallery Grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.slice(1).map((imgUrl, idx) => (
                  <div key={idx} className="reveal-item bg-[#f2f2f2] aspect-square flex items-center justify-center p-4 rounded-md shadow-sm">
                    <img src={resolveAsset(imgUrl)} alt={`${product.title} thumbnail ${idx+1}`} className="w-full h-full object-contain mix-blend-multiply drop-shadow-md" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="w-full lg:w-2/5 flex flex-col pt-4">
            <h1 className="reveal-item font-heading font-black text-4xl lg:text-5xl mb-6 text-black tracking-tighter">
              {product.title}
            </h1>
            
            {product.description ? (
              <p className="reveal-item font-data text-slate-700 text-lg leading-relaxed font-medium mb-12">
                {product.description}
              </p>
            ) : (
              <p className="reveal-item font-data text-slate-700 text-lg leading-relaxed font-medium mb-12">
                Engineered acoustic precision built for demanding sonic environments. Experience unparalleled sound dampening and aesthetic purity.
              </p>
            )}

            {/* Documentation Section */}
            {product.docs && product.docs.length > 0 && (
              <div className="reveal-item mt-auto border-t border-slate-200 pt-8">
                <h3 className="font-heading font-bold text-xl mb-4">Documentation</h3>
                <div className="flex flex-col gap-3">
                  {product.docs.map((doc, idx) => (
                    <a 
                      key={idx}
                      href={doc.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between bg-white border border-slate-200 px-5 py-4 hover:border-black transition-colors shadow-sm"
                    >
                      <span className="font-heading font-bold text-sm uppercase tracking-wide text-slate-800 group-hover:text-black">
                        {doc.title}
                      </span>
                      <Download size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Nav Tabs */}
        {availableTabs.length > 0 && (
          <div className="reveal-item w-full mb-24">
            <div className="flex flex-wrap border-b border-slate-200 mb-8 gap-x-8 gap-y-4">
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`font-heading text-lg font-bold pb-4 border-b-[3px] transition-colors relative top-[1px] ${
                    activeTab === tab.id 
                      ? 'border-black text-black' 
                      : 'border-transparent text-slate-400 hover:text-black hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="w-full min-h-[300px]">
              {availableTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`prose prose-lg prose-slate max-w-none 
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-black
                    prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl prose-img:w-full prose-img:object-cover
                    prose-ul:list-disc prose-ol:list-decimal
                    ${activeTab === tab.id ? 'block' : 'hidden'}
                  `}
                  dangerouslySetInnerHTML={{ __html: product.sections[tab.id] }}
                />
              ))}
            </div>
          </div>
        )}

      </section>
      
      <div className="reveal-item px-4 max-w-[1400px] mx-auto w-full">
        <QuoteJourney />
      </div>
    </div>
  );
}
