import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import catalog from '../data/abstracta_catalog.json';
import QuoteJourney from '../components/QuoteJourney';

// Dynamic asset map for products
const productAssets = import.meta.glob('../assets/products/*', { eager: true, import: 'default' });
const categoryAssets = import.meta.glob('../assets/generated/*', { eager: true, import: 'default' });

const resolveAsset = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Try to match path from catalog to bundled asset
  // Catalog paths look like "/src/assets/products/filename.png" 
  // or "/generated/filename.png"
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

export default function CategoryPage() {
  const { categorySlug } = useParams();
  const pageRef = useRef(null);

  const getCleanTitle = (raw) => raw.replace(/<[^>]*>?/gm, '').trim();

  // Find category explicitly to get the clean title
  const category = catalog.categories.find(c => c.slug === categorySlug);
  const title = category ? getCleanTitle(category.title) : 'Products';
  
  // Filter products by categorySlug
  const products = catalog.products.filter(p => p.categorySlug === categorySlug);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-block", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, [categorySlug]);

  if (!category) {
    return <div className="pt-40 text-center font-heading text-2xl">Category not found</div>;
  }

  return (
    <div ref={pageRef} className="w-full flex flex-col pt-32 pb-16 relative overflow-hidden bg-[#fafafa] text-black min-h-screen font-body">
      <section className="w-full flex flex-col items-center relative z-20 px-6 max-w-[1400px] mx-auto">
        
        <div className="mb-14 reveal-block flex flex-col items-center text-center">
          <h1 className="font-heading font-black text-[3.5rem] md:text-6xl mb-4 text-black tracking-tight tracking-tighter">{title}</h1>
          <p className="font-data text-slate-800 max-w-2xl text-[1.1rem] md:text-lg leading-relaxed font-semibold">
            Explore our range of purpose-built acoustic solutions engineered to eliminate noise pollution and maximize spatial calm.
          </p>
        </div>

        <div className="w-full mb-10 reveal-block flex justify-center">
          <Link to="/products" className="px-8 py-3 bg-black text-white rounded-full font-heading font-bold text-lg hover:bg-accent hover:-translate-y-1 transition-all duration-300 shadow-md">
            All Products
          </Link>
        </div>

        <div className="w-full mb-10 reveal-block text-center flex flex-col items-center">
          <h2 className="font-heading font-black text-3xl md:text-4xl text-accent tracking-tight mb-2">
            Products in this category
          </h2>
          <div className="w-12 h-1 bg-black/10 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-24 px-4">
          {products.map((prod, i) => (
            <Link key={i} to={`/products/${categorySlug}/${prod.slug}`} className="reveal-block group flex flex-col cursor-pointer pb-6 hover:-translate-y-1 transition-transform duration-500">
              <h3 className="mb-4 font-heading text-black font-extrabold text-[15px] md:text-[17px] text-center transition-colors duration-300 group-hover:text-accent">
                {prod.title}
              </h3>
              <div className="w-full aspect-square bg-[#f2f2f2] relative overflow-hidden flex items-center justify-center group-hover:bg-[#ebebeb] transition-colors duration-500 shadow-sm group-hover:shadow-md">
                <img 
                  src={resolveAsset(prod.img)} 
                  alt={prod.title} 
                  className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mix-blend-multiply"
                />
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="col-span-full text-center py-20 font-data text-slate-500">
              No products available in this category.
            </div>
          )}
        </div>
      </section>
      
      <div className="reveal-block px-4 max-w-[1400px] mx-auto w-full">
        <QuoteJourney />
      </div>
    </div>
  );
}
