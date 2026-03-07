import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function QuoteJourney() {
  const [approach, setApproach] = useState(null); // 'during' | 'after'
  const [sector, setSector] = useState(null); // 'schools' | 'highrise' | 'consultancy' | 'hospitals'
  const [showForm, setShowForm] = useState(false);

  const containerRef = useRef(null);
  const sectorRef = useRef(null);
  const productRef = useRef(null);
  const formRef = useRef(null);

  // Dummy products mapped to sectors
  const productsMap = {
    schools: [
      { id: 1, name: 'EchoBaffle 360', desc: 'Ceiling suspended diffusers to mitigate voice echoes.' },
      { id: 2, name: 'WallPanel Core', desc: 'Durable foam panels for high-traffic corridors.' },
      { id: 3, name: 'SilentDoor Pro', desc: 'Heavy-core solid wood with acoustic seals.' }
    ],
    highrise: [
      { id: 4, name: 'VibeIsolator Grid', desc: 'Floor vibration isolation for heavy machinery.' },
      { id: 5, name: 'FacadeShield Glass', desc: 'STC-rated triple pane acoustic windows.' },
      { id: 6, name: 'HVAC Silencer Tube', desc: 'Duct lining and silencers for vertical shafts.' }
    ],
    consultancy: [
      { id: 7, name: 'Spatial Mapping', desc: '3D resonance and reverberation modeling.' },
      { id: 8, name: 'Material Specification', desc: 'Custom selected NCR rated architectural finishes.' },
      { id: 9, name: 'Ordinance Review', desc: 'City noise code compliance and certification.' }
    ],
    hospitals: [
      { id: 10, name: 'SterileAcoustic Tiles', desc: 'Anti-microbial acoustic ceiling grids.' },
      { id: 11, name: 'PrivacySeal Doors', desc: 'Ensuring HIPAA compliance for consultation rooms.' },
      { id: 12, name: 'Machine Damping Pad', desc: 'MRI and heavy equipment vibration control.' }
    ]
  };

  const activeProducts = sector ? productsMap[sector] : [];

  // Scroll logic when sections reveal
  useEffect(() => {
    if (approach && sectorRef.current) {
      gsap.fromTo(sectorRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      sectorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [approach]);

  useEffect(() => {
    if (sector && productRef.current) {
      gsap.fromTo(productRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      productRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [sector]);

  useEffect(() => {
    if (showForm && formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [showForm]);

  return (
    <section id="quote-journey" ref={containerRef} className="py-20 px-6 md:px-12 lg:px-24 bg-paper min-h-[80vh] text-dark flex flex-col items-center w-full relative overflow-hidden">
      
      {/* Technical Grid Pattern Background */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-100"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-paper via-transparent to-paper"></div>

      <div className="text-center mb-16 max-w-3xl relative z-20">
        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter">
          Quote Journey
        </h2>
        <p className="font-data mt-4 text-dark/60 text-sm md:text-base">Initialize the diagnostic array. Define the boundaries of your acoustic environment.</p>
      </div>

      {/* STEP 1: APPROACH */}
      <div className="w-full max-w-5xl mb-12">
        <h3 className="font-heading font-bold text-2xl mb-8 border-b-2 border-dark/10 pb-4">01. Service Approach</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => { setApproach('during'); setSector(null); setShowForm(false); }}
            className={`p-8 rounded-[2rem] text-left transition-all duration-300 border-2 ${
              approach === 'during' ? 'border-accent bg-accent text-paper shadow-lg scale-[1.02]' : 'border-dark/10 hover:border-dark/30 hover:-translate-y-1'
            }`}
          >
            <h4 className="font-heading font-bold text-3xl mb-2">During Finishes</h4>
            <p className="font-data text-sm opacity-80">Integrating acoustic solutions during the active build phase.</p>
          </button>

          <button 
            onClick={() => { setApproach('after'); setSector(null); setShowForm(false); }}
            className={`p-8 rounded-[2rem] text-left transition-all duration-300 border-2 ${
              approach === 'after' ? 'border-accent bg-accent text-paper shadow-lg scale-[1.02]' : 'border-dark/10 hover:border-dark/30 hover:-translate-y-1'
            }`}
          >
            <h4 className="font-heading font-bold text-3xl mb-2">After Building Finishes</h4>
            <p className="font-data text-sm opacity-80">Retrofitting surfaces and spaces post-construction.</p>
          </button>
        </div>
      </div>

      {/* STEP 2: SECTOR */}
      {approach && (
        <div ref={sectorRef} className="w-full max-w-5xl mb-16">
          <h3 className="font-heading font-bold text-2xl mb-8 border-b-2 border-dark/10 pb-4">02. Select Your Sector</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['schools', 'highrise', 'consultancy', 'hospitals'].map(sec => (
              <button
                key={sec}
                onClick={() => { setSector(sec); setShowForm(false); }}
                className={`p-6 rounded-[1.5rem] font-heading font-bold uppercase tracking-tight text-lg sm:text-xl transition-all duration-300 border-2 ${
                  sector === sec ? 'border-dark bg-dark text-paper scale-[1.05]' : 'border-dark/5 hover:border-dark/20 hover:bg-dark/5'
                }`}
              >
                {sec === 'highrise' ? 'High-rise' : sec}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: PRODUCTS & SERVICES */}
      {sector && (
        <div ref={productRef} className="w-full max-w-5xl mb-16 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-dark/5">
          <h3 className="font-heading font-bold text-3xl md:text-4xl mb-4">Recommended Solutions for {sector === 'highrise' ? 'High-rise' : sector}</h3>
          <p className="font-data text-dark/60 mb-10 max-w-2xl">Based on your requirement protocol ({approach} finishes), these are the highly calibrated interventions we prescribe.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {activeProducts.map((prod) => (
              <div key={prod.id} className="p-6 bg-background rounded-[1.5rem] border border-dark/5 hover:border-accent/50 transition-colors">
                <div className="w-8 h-8 bg-dark/10 rounded-full mb-4 flex items-center justify-center font-data text-xs">{prod.id}</div>
                <h4 className="font-heading font-bold text-xl mb-2">{prod.name}</h4>
                <p className="font-data text-sm text-dark/70">{prod.desc}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowForm(true)}
            className="btn-magnetic w-full md:w-auto px-8 py-4 bg-accent text-paper rounded-full font-heading font-semibold text-lg relative group overflow-hidden"
          >
            <span className="relative z-10">Inquire About These Services</span>
            <span className="absolute inset-0 bg-dark translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
          </button>
        </div>
      )}

      {/* STEP 4: INQUIRY FORM */}
      {showForm && (
        <div ref={formRef} className="w-full max-w-3xl bg-dark text-paper p-8 md:p-12 rounded-[3rem] shadow-2xl">
          <h3 className="font-heading font-bold text-3xl md:text-5xl mb-8 uppercase tracking-tighter">Submit Request</h3>
          
          <form action="https://formsubmit.co/Dhooom.g9@gmail.com" method="POST" className="flex flex-col gap-6 font-data">
            {/* Hidden fields for FormSubmit configuration */}
            <input type="hidden" name="_subject" value="New Sokoon Quote Request!" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Approach (Locked)</label>
                <input type="text" name="Approach" readOnly value={approach === 'during' ? 'During Finishes' : 'After Building Finishes'} className="w-full bg-paper/5 border border-paper/20 rounded-xl p-3 text-paper opacity-70 outline-none" />
              </div>
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Sector (Locked)</label>
                <input type="text" name="Sector" readOnly value={sector || ''} className="w-full bg-paper/5 border border-paper/20 rounded-xl p-3 text-paper opacity-70 outline-none capitalize" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Full Name</label>
                <input type="text" name="Name" required placeholder="John Doe" className="w-full bg-paper/10 border border-paper/20 rounded-xl p-3 text-paper outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Email Address</label>
                <input type="email" name="Email" required placeholder="john@example.com" className="w-full bg-paper/10 border border-paper/20 rounded-xl p-3 text-paper outline-none focus:border-accent transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Phone Number</label>
                <input type="tel" name="Phone" required placeholder="+1 234 567 8900" className="w-full bg-paper/10 border border-paper/20 rounded-xl p-3 text-paper outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Budget Range</label>
                <select name="Budget" className="w-full bg-paper/10 border border-paper/20 rounded-xl p-3 text-paper outline-none focus:border-accent transition-colors appearance-none" required>
                  <option className="bg-dark text-paper" value="">Select Budget</option>
                  <option className="bg-dark text-paper" value="$10k - $50k">$10k - $50k</option>
                  <option className="bg-dark text-paper" value="$50k - $150k">$50k - $150k</option>
                  <option className="bg-dark text-paper" value="$150k+">$150k+</option>
                </select>
              </div>
              <div>
                <label className="text-xs opacity-50 mb-2 block uppercase">Timeline</label>
                <select name="Timeline" className="w-full bg-paper/10 border border-paper/20 rounded-xl p-3 text-paper outline-none focus:border-accent transition-colors appearance-none" required>
                  <option className="bg-dark text-paper" value="">Select Timeline</option>
                  <option className="bg-dark text-paper" value="Immediate (ASAP)">Immediate (ASAP)</option>
                  <option className="bg-dark text-paper" value="1 - 3 Months">1 - 3 Months</option>
                  <option className="bg-dark text-paper" value="6+ Months">6+ Months</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs opacity-50 mb-2 block uppercase">Project Details</label>
              <textarea name="Project Details" required rows="4" placeholder="Describe the scale, dimensions, and specific acoustic challenges..." className="w-full bg-paper/10 border border-paper/20 rounded-xl p-3 text-paper outline-none focus:border-accent transition-colors resize-none"></textarea>
            </div>

            <button type="submit" className="btn-magnetic mt-4 px-8 py-4 bg-accent text-paper rounded-full font-heading font-semibold text-lg relative group overflow-hidden w-full">
              <span className="relative z-10">Transmit Request Data</span>
              <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0"></span>
            </button>
          </form>
        </div>
      )}

    </section>
  );
}
