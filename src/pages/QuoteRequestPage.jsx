import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function QuoteRequestPage() {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-body min-h-[100dvh] text-primary flex justify-center items-center w-full relative overflow-hidden">
      
      {/* Technical Grid Pattern Background */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-body via-transparent to-body"></div>

      <div ref={formRef} className="w-full max-w-4xl bg-card text-primary p-8 md:p-12 lg:p-16 rounded-[3rem] shadow-2xl border-4 border-primary relative z-20">
        <div className="text-center mb-12">
          <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-primary">
            Quote Request
          </h1>
          <p className="font-data mt-4 text-primary/60 text-base max-w-xl mx-auto">
            Provide your project details and parameters below. Our acoustic engineering team will review your specifications and orchestrate a custom deployment protocol.
          </p>
        </div>

        <form action="https://formsubmit.co/Dhooom.g9@gmail.com" method="POST" className="flex flex-col gap-6 font-data">
          {/* Hidden fields for FormSubmit configuration */}
          <input type="hidden" name="_subject" value="New Sokoon Quote Request!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_next" value="http://localhost:5174/" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Approach phase</label>
              <select name="Approach" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-accent/20" required>
                <option className="bg-white text-primary" value="">Select Approach</option>
                <option className="bg-white text-primary" value="During Finishes">During Finishes</option>
                <option className="bg-white text-primary" value="After Building Finishes">After Building Finishes</option>
                <option className="bg-white text-primary" value="Consultancy Only">Consultancy Only</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Target Sector</label>
              <select name="Sector" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-accent/20" required>
                <option className="bg-white text-primary" value="">Select Sector</option>
                <option className="bg-white text-primary" value="Corporate Office">Corporate Office</option>
                <option className="bg-white text-primary" value="High-rise">High-rise</option>
                <option className="bg-white text-primary" value="Schools / Education">Schools / Education</option>
                <option className="bg-white text-primary" value="Hospitals / Medical">Hospitals / Medical</option>
                <option className="bg-white text-primary" value="Broadcast / Studio">Broadcast / Studio</option>
                <option className="bg-white text-primary" value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Full Name</label>
              <input type="text" name="Name" required placeholder="John Doe" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors placeholder:text-primary/40 focus:ring-2 focus:ring-accent/20" />
            </div>
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Email Address</label>
              <input type="email" name="Email" required placeholder="john@example.com" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors placeholder:text-primary/40 focus:ring-2 focus:ring-accent/20" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Phone Number</label>
              <input type="tel" name="Phone" required placeholder="+1 234 567 8900" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors placeholder:text-primary/40 focus:ring-2 focus:ring-accent/20" />
            </div>
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Budget Range</label>
              <select name="Budget" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-accent/20" required>
                <option className="bg-white text-primary" value="">Select Budget</option>
                <option className="bg-white text-primary" value="$10k - $50k">$10k - $50k</option>
                <option className="bg-white text-primary" value="$50k - $150k">$50k - $150k</option>
                <option className="bg-white text-primary" value="$150k+">$150k+</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-primary font-bold mb-2 block uppercase">Timeline</label>
              <select name="Timeline" className="w-full bg-white border-2 border-primary rounded-xl p-3 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-accent/20" required>
                <option className="bg-white text-primary" value="">Select Timeline</option>
                <option className="bg-white text-primary" value="Immediate (ASAP)">Immediate (ASAP)</option>
                <option className="bg-white text-primary" value="1 - 3 Months">1 - 3 Months</option>
                <option className="bg-white text-primary" value="6+ Months">6+ Months</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-primary font-bold mb-2 block uppercase">Project Details</label>
            <textarea name="Project Details" required rows="5" placeholder="Describe the scale, dimensions, and specific acoustic challenges..." className="w-full bg-white border-2 border-primary rounded-xl p-4 text-primary font-bold outline-none focus:border-accent hover:border-accent transition-colors resize-none placeholder:text-primary/40 focus:ring-2 focus:ring-accent/20"></textarea>
          </div>

          <button type="submit" className="btn-magnetic mt-6 px-8 py-5 bg-accent text-on-dark rounded-[2rem] font-heading font-black text-xl w-full shadow-2xl border-2 border-accent hover:scale-[1.02] transition-all duration-300">
            Submit Quote Request
          </button>
        </form>
      </div>

    </section>
  );
}
